<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Asset extends Model
{
    protected $fillable = [
        'name', 'type', 'path', 'size', 'size_human', 'extension', 'width', 'height', 'alt',
    ];

    protected static $beforeUploadHook;

    protected static $beforeSaveHook;

    protected static $afterSaveHook;

    public static $resourceActions = [];

    public static $resourceFilters = [];

    public static $fieldActions = [];

    public function src()
    {
        $disk = config('invicta.disk');
        $prefix = $disk == 'public' ? '/storage/' : '';

        return $this->asset($prefix.$this->path);
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

        if (self::where('path', '=', $path.$filename)->exists() || ! self::beforeUpload($file, $path)) {
            return response()->json(['message' => 'Asset with this name already exists!'], 409);
        }

        $mime = $file->getMimeType();

        $image = Str::of($mime)->contains('image');
        $document = Str::of($mime)->contains(config('invicta.assets_documents'));
        $audio = Str::of($mime)->contains('audio');

        // Double check for svgs
        $svg = $fileinfo['extension'] == 'svg';
        $image = $svg ? true : $image;
        $debug = ['image' => $image, 'document' => $document, 'audio' => $audio, 'mime' => $mime];

        if ($image !== false) {
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

        // Run before save hook
        $item = self::beforeSave($item);

        // Save to DB
        $asset = self::create($item);

        // Run after save hook
        $asset = self::afterSave($asset);

        return response()->json([
            'asset' => [
                'id' => $asset->id,
                'src' => (new self)->asset($asset->path),
                'path' => $asset->path,
                'alt' => '',
                'name' => $asset->name,
                'width' => $asset->width,
                'height' => $asset->height,
                'size' => $asset->size,
            ],
            'message' => [
                'type' => 'success',
                'title' => 'Asset was uploaded',
            ],
        ]);
    }

    public static function formatBytes($size, $level = 0, $precision = 2, $base = 1024)
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

    private function asset($asset)
    {
        $path = is_array($asset) ? $asset['path'] : $asset;

        if (config('invicta.disk') == 's3') {
            $domain = config('filesystems.disks.s3.url');
            $asset = Str::of($path);

            if (config('invicta.image_to_webp')) {
                $asset->finish('.webp');
            }

            return $asset->start('/')->prepend($domain);
        }

        return asset($path);
    }

    public static function resourceActions($actions)
    {
        static::$resourceActions = $actions;
    }

    public static function resourceFilters($filters)
    {
        static::$resourceFilters = $filters;
    }

    public static function fieldActions($actions)
    {
        static::$fieldActions = $actions;
    }

    public static function runBeforeUpload($hook)
    {
        static::$beforeUploadHook = $hook;
    }

    public static function runBeforeSave($hook)
    {
        static::$beforeSaveHook = $hook;
    }

    public static function runAfterSave($hook)
    {
        static::$afterSaveHook = $hook;
    }

    private static function beforeUpload($file, $path)
    {
        if ($hook = static::$beforeUploadHook) {
            return $hook::run(['file' => $file, 'path' => $path]);
        }

        return true;
    }

    private static function beforeSave($item)
    {
        if ($hook = static::$beforeSaveHook) {
            $item = $hook::run($item);
        }

        return $item;
    }

    private static function afterSave($asset)
    {
        if ($hook = static::$afterSaveHook) {
            $asset = $hook::run($asset);
        }

        return $asset;
    }
}
