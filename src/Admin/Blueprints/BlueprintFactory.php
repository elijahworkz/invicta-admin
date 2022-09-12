<?php

namespace Eteacher\InvictaAdmin\Admin\Blueprints;

use Eteacher\InvictaAdmin\Events\BlueprintFound;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BlueprintFactory
{
    protected $resource;

    protected $item = null;

    public function getDefault($resource, $item = null)
    {
        $this->resource = $resource;
        $this->item = $item;

        return $this->maybeGetCachedBlueprint();
    }

    public function findByHandle($resource, $handle)
    {
        $this->resource = $resource;

        return $this->maybeGetCachedBlueprint($handle);
    }

    private function maybeGetCachedBlueprint($handle = 'default')
    {
        $cacheHandle = $this->resource->handle();
        $cacheHandle = $this->item && $this->item->blueprint
            ? Str::of($cacheHandle)->finish('-')->append($this->item->blueprint)
            : Str::of($cacheHandle)->finish('-')->append($handle);

        if (config('invicta.cache_blueprints')) {
            return Cache::rememberForever('blueprint-'.$cacheHandle, function () use ($handle) {
                return $this->findBlueprint($handle);
            });
        }

        return $this->findBlueprint($handle);
    }

    private function findBlueprint($handle)
    {
        $blueprint = [];

        if ($handle == 'default') {
            $blueprint = $this->getBlueprint();
        } else {
            $folder = resource_path('blueprints/'.$this->resource->handle());
            $blueprint = $this->getBlueprintFile($folder, $handle);
        }
        $blueprint = new Blueprint($blueprint);

        BlueprintFound::dispatch($blueprint, $this->resource, $this->item);

        return $blueprint;
    }

    private function getBlueprint()
    {
        // Check resource blueprint function first
        if (! $blueprint = $this->resource->blueprint($this->item)) {
            // check for custom blueprint on the item
            if ($this->item && isset($this->item->blueprint)) {
                $folder = resource_path('blueprints/'.$this->resource->handle());
                $name = $this->item->blueprint;

                $blueprint = $this->getBlueprintFile($folder, $name);
            }

            if (! $this->item || ! isset($this->item->blueprint) || ! $blueprint) {
                // get default blueprint
                $defaultFolder = app_path('Invicta/Resources/blueprints');
                $defaultName = Str::of($this->resource->model)->classBasename();

                $blueprint = $this->getBlueprintFile($defaultFolder, $defaultName);
            }
        }

        return $blueprint;
    }

    private function getBlueprintFile($folder, $name)
    {
        $path = $folder.'/'.$name.'.php';

        if (File::exists($path)) {
            return require $path;
        }

        return null;
    }
}
