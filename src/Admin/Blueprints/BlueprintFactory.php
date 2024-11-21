<?php

namespace Elijahworkz\InvictaAdmin\Admin\Blueprints;

use Elijahworkz\InvictaAdmin\Events\BlueprintFound;
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

    public function detailBlueprint($resource, $item)
    {
        if (method_exists($resource, 'detailBlueprint')) {
            return $resource->detailBlueprint($item);
        }
    }

    public function getFields($resource, $handle, $fieldType = null)
    {
        $blueprint = $this->findByHandle($resource, $handle)->toArray();
        $fields = [];

        if (isset($blueprint['fields'])) {
            $fields = $this->filterFields($blueprint->fields, $fieldType);
        }

        if (isset($blueprint['sidebar'])) {
            $fields = [...$fields, ...$this->filterFields($blueprint['sidebar']['fields'], $fieldType)];
        }

        if (isset($blueprint['sections'])) {
            $sections = $blueprint['sections'];

            foreach ($sections as $section) {
                if (isset($section['fields'])) {
                    $fields = [...$fields, ...$this->filterFields($section['fields'], $fieldType)];
                }
            }
        }

        return count($fields) > 0 ? $fields : null;
    }

    private function filterFields($fields, $fieldType = null)
    {
        $allFields = [];

        foreach ($fields as $field) {
            if (isset($field['fields'])) {
                $allFields = [...$allFields, ...$this->filterFields($field['fields'], $fieldType)];
            } else {
                if (isset($field['id']) && ($fieldType ? $field['type'] == $fieldType : true)) {
                    $allFields[] = $field;
                }
            }
        }

        return $allFields;
    }

    private function maybeGetCachedBlueprint($handle = 'default')
    {
        $cacheHandle = $this->resource->handle();
        $cacheHandle = $this->item && isset($this->item->blueprint)
            ? Str::of($cacheHandle)->finish('-')->append($this->item->blueprint)
            : Str::of($cacheHandle)->finish('-')->append($handle);

        if (config('invicta.cache_blueprints') && $this->resource->cacheBlueprint) {
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
