<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait CanEditItems
{
    /**
     * Optional blueprint path.
     *
     * @var string
     */
    public $blueprintPath = null;

    /**
     * Set blueprint from function.
     *
     * @param Illuminate\Database\Eloquent\Model $item
     * @return array
     */
    public function blueprint($item)
    {
        //
    }

    public function getBlueprint($item)
    {
        $blueprint = null;

        // Check for PHP blueprint first
        if (! $blueprint = $this->blueprint($item)) {

            // check for default json blueprint
            $defaultFolder = app_path('Invicta/Resources/blueprints');
            $defaultName = Str::of($this->model)->classBasename();

            // check for custom blueprint on the item
            if (isset($item->blueprint)) {
                $folderPath = $this->blueprintPath ? $this->blueprintPath : 'blueprints/'.$this->handle();
                $folder = resource_path($folderPath);
                $name = $item->blueprint;

                $blueprint = $this->getBlueprintFile($folder, $name);
            }

            if (! isset($item->blueprint) || ! $blueprint) {
                $blueprint = $this->getBlueprintFile($defaultFolder, $defaultName);
            }
        }

        return $blueprint;
    }

    public function validationRules()
    {
        return $this->parseBlueprint('parseValidation');
    }

    private function parseValidation($field)
    {
        return isset($field['validation'])
            ? $field['validation']
            : 'nullable';
    }

    private function parseBlueprint($callback)
    {
        $fields = [];

        if ($blueprint = $this->getBlueprint($this->model())) {
            if (isset($blueprint['fields'])) {
                $fields = $this->parseFields($blueprint['fields'], $callback);
            }

            if (isset($blueprint['sidebar']) && isset($blueprint['sidebar']['fields'])) {
                $fields = array_merge($fields, $this->parseFields($blueprint['sidebar']['fields'], 'parseValidation'));
            }

            if (isset($blueprint['sections'])) {
                foreach ($blueprint['sections'] as $section) {
                    if (isset($section['fields'])) {
                        $fields = array_merge($fields, $this->parseFields($section['fields'], 'parseValidation'));
                    }
                }
            }
        }

        return $fields;
    }

    private function parseFields($fields, $callable)
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
        $path = $folder.'/'.$name.'.json';

        if (File::exists($path)) {
            return json_decode(File::get($path), true);
        }

        return null;
    }
}
