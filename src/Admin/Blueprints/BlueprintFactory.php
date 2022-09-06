<?php

namespace Eteacher\InvictaAdmin\Admin\Blueprints;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BlueprintFactory
{
    protected $resource;

    protected $item = null;

    public function findForResource($resource, $item = null)
    {
        $this->resource = $resource;
        $this->item = $item;

        return $this->maybeGetCachedBlueprint();
    }

    public function findByHandle($resource, $handle)
    {
        if ($handle == 'default') {
            $this->resource = $resource;

            return $this->getBlueprint();
        }

        $folder = resource_path('blueprints/'.$resource->handle());
        $blueprint = $this->getBlueprintFile($folder, $handle);

        if ($blueprint) {
            return $this->parseForFieldsets($blueprint);
        }

        return null;
    }

    private function maybeGetCachedBlueprint()
    {
        $cacheHandle = $this->item && $this->item->blueprint
            ? $this->item->blueprint
            : $this->resource->handle();

        if (! app()->environment('local')) {
            return Cache::rememberForever('blueprint-'.$cacheHandle, function () {
                $this->getBlueprint();
            });
        }

        return $this->getBlueprint();
    }

    private function getBlueprint()
    {
        // Check resource blueprint function first
        if (! $blueprint = $this->resource->blueprint($this->item)) {
            // check for custom blueprint on the item
            if ($this->item && isset($this->item->blueprint)) {
                // $folderPath = $resource->blueprintPath ? $resource->blueprintPath : 'blueprints/'.$resource->handle();
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

        return $this->parseForFieldsets($blueprint);
    }

    private function parseForFieldsets($blueprint)
    {
        if (isset($blueprint['fields'])) {
            $blueprint['fields'] = $this->getFieldsets($blueprint['fields']);
        }

        if (isset($blueprint['sidebar']) && isset($blueprint['sidebar']['fields'])) {
            $blueprint['sidebar']['fields'] = $this->getFieldsets($blueprint['sidebar']['fields']);
        }

        if (isset($blueprint['sections'])) {
            foreach ($blueprint['sections'] as $key => $section) {
                if (isset($section['fields'])) {
                    $blueprint['sections'][$key]['fields'] = $this->getFieldsets($section['fields']);
                }
            }
        }

        return new Blueprint($blueprint);
    }

    private function getFieldsets($fields)
    {
        $parsed = [];

        foreach ($fields as $field) {
            if (! isset($field['fieldset'])) {
                $parsed[] = $field;
            } else {
                $fieldsetFields = $this->getFieldset($field['fieldset']);
                $parsed = [...$parsed, ...$this->getFieldsets($fieldsetFields)];
            }
        }

        return $parsed;
    }

    private function getFieldset($handle)
    {
        $path = resource_path('fieldsets/'.$handle.'.php');

        return require $path;
    }

    private function parseForValueFields($blueprint, $callback)
    {
        $fields = [];

        if (isset($blueprint['fields'])) {
            $fields = $this->getValueFields($blueprint['fields'], $callback);
        }

        if (isset($blueprint['sidebar']) && isset($blueprint['sidebar']['fields'])) {
            $fields = array_merge($fields, $this->getValueFields($blueprint['sidebar']['fields'], $callback));
        }

        if (isset($blueprint['sections'])) {
            foreach ($blueprint['sections'] as $section) {
                if (isset($section['fields'])) {
                    $fields = array_merge($fields, $this->getValueFields($section['fields'], $callback));
                }
            }
        }

        return $fields;
    }

    private function getValueFields($fields, $callable)
    {
        $resourceFields = [];

        return collect($fields)->reduce(function ($carry, $field) use ($callable) {
            if (isset($field['id'])) {
                $id = isset($field['path']) ? $field['path'] : $field['id'];

                $carry[$id] = $this->$callable($field);

                return $carry;
            }

            return $carry;
        }, []);
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
