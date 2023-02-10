<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;

class Asset extends Model
{
    protected $fillable = [
        'name', 'type', 'path', 'size', 'size_human', 'extension', 'width', 'height', 'alt',
    ];

    protected static $enableCloudinary = false;

    public function src()
    {
        $disk = config('invicta.disk');
        $prefix = $disk == 'public' ? '/storage/' : '';

        return _asset($prefix.$this->path);
    }

    public static function saveFile($file)
    {
        $storage = Storage::disk(config('invicta.disk'));

        $file_path = $file->getPathName();
        $filename = $file->getClientOriginalName();
        $fileinfo = pathinfo($filename);

        $path = self::getPath();

        // Normalize file names
        $filename = Str::of($filename)->replace(' ', '-');

        if (self::where('path', '=', $path.$filename)->exists()) {
            return response()->json(['message' => 'Asset with this name already exists!'], 409);
        }

        $mime = $file->getMimeType();

        $image = Str::of($mime)->contains('image');
        $document = Str::of($mime)->contains(['pdf', 'text']);
        $audio = Str::of($mime)->contains('audio');

        // Double check for svgs
        $svg = $fileinfo['extension'] == 'svg';
        $image = $svg ? true : $image;
        $debug = ['image' => $image, 'document' => $document, 'audio' => $audio, 'mime' => $mime];

        if ($image !== false) {
            // Send to Cloudinary ?
            if (! self::$enableCloudinary || in_array($fileinfo['extension'], ['svg', 'ico', 'gif'])) {
                $result = false;
            } else {
                $result = CloudinaryService::upload($file_path, $filename);
            }

            if ($result) {
                $contents = file_get_contents($result['url']);

                $item = [
                    'name' => $filename,
                    'path' => $path.$filename,
                    'type' => 'image',
                    'extension' => $result['format'],
                    'size' => ($result['bytes'] != 0) ? $result['bytes'] : 0,
                    'size_human' => ($result['bytes'] != 0) ? self::formatBytes($result['bytes'], 0) : 0,
                    'width' => $result['width'],
                    'height' => $result['height'],
                ];

                $storage->put($path.$filename, $contents);
            } else {
                $filesize = filesize($file);
                [$width, $height] = getimagesize($file);

                $item = [
                    'name' => $filename,
                    'path' => $path.$filename,
                    'type' => 'image',
                    'extension' => $fileinfo['extension'],
                    'size' => ($filesize != 0) ? $filesize : 0,
                    'size_human' => ($filesize != 0) ? self::formatBytes($filesize, 0) : 0,
                    'width' => $width ?? 0,
                    'height' => $height ?? 0,
                ];

                $storage->putFileAs($path, $file, $filename);
            }
        } else {
            $folder = ($audio !== false) ? 'audio' : 'documents';
            $type = ($audio !== false) ? 'audio' : 'document';
            $path = Str::of($path)->finish('/')->append($folder);

            $filesize = filesize($file);
            $filetime = filemtime($file);

            // return ['debug' => $debug, $folder, $type, $filename, $filesize];

            $item = [
                'name' => $filename,
                'path' => "{$path}/{$filename}",
                'type' => $type,
                'extension' => $fileinfo['extension'],
                'size' => ($filesize != 0) ? $filesize : 0,
                'size_human' => self::formatBytes($filesize, 0),
            ];

            $storage->putFileAs($path, $file, $filename);
        }

        // Save to DB
        $asset = self::create($item);

        return response()->json([
            'asset' => [
                'id' => $asset->id,
                'src' => _asset($asset->path),
                'path' => $asset->path,
                'alt' => '',
                'name' => $asset->name,
                'width' => $asset->width,
                'height' => $asset->height,
            ],
            'message' => [
                'type' => 'success',
                'title' => 'Asset was uploaded',
            ],
        ]);
    }

    private static function formatBytes($size, $level = 0, $precision = 2, $base = 1024)
    {
        $unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        $times = floor(log($size, $base));

        return sprintf('%.'.$precision.'f', $size / pow($base, ($times + $level))).' '.$unit[$times + $level];
    }

    private static function getPath()
    {
        $path = config('invicta.assets_path');
        $pathArray = collect(explode('/', $path))->filter()->toArray();

        $folderArray = request()->has('folder')
            ? collect(explode('/', request()->get('folder')))->filter()->toArray()
            : [];

        $fullPathArray = [...$pathArray, ...$folderArray];

        return Str::of(implode('/', $fullPathArray))->start('/')->finish('/');
    }

    public static function updateResourceAsset($item, $field, $name)
	{

		$fieldData = explode('.', $field);
		$mainField = $fieldData[0];
		unset($fieldData[0]);
		$field = implode('.', $fieldData);

		$asset = Arr::get($item[$mainField], $field);

		if ($asset) {
			$nameData = explode('.', $asset['name']);
			$assetName = $name . '.' . $nameData[1];

			$assetPath = explode('/', $asset['path']);
			$assetPath[count($assetPath)-1] = $assetName;
			$assetPath = Str::start(implode('/', $assetPath), '/');

			if ($asset['path'] != $assetPath) {
				Storage::move($asset['path'], $assetPath);

				$asset['name'] = $assetName;
				$asset['path'] = $assetPath;
				$asset['src'] = _asset($assetPath);

				$temp = $item[$mainField];
				Arr::set($temp, $field, $asset);

				$item[$mainField] = $temp;
				$item->save();

				Asset::where('id', $asset['id'])
					->update([
						'path' => $assetPath,
						'name' => $assetName,
					]);
			}
		}

		return $item;
	}
}
