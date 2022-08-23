<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

trait CanEditItems
{
    public function blueprint()
    {
        //
    }

    public function getBlueprint()
    {
        // Check for PHP blueprint first
        if ($blueprint = $this->blueprint()) {
            return $blueprint;
        }

        // check for json blueprint
        $folder = app_path('Invicta/Resources/blueprints');
        $name = Str::of($this->model)->classBasename();

        $path = $folder.'/'.$name.'.json';

        if (File::exists($path)) {
            return json_decode(File::get($path), true);
        }

        return null;
    }

    public function validationRules()
    {
        $rules = [];

        if ($blueprint = $this->getBlueprint()) {
            if (isset($blueprint['fields'])) {
                $rules = $this->parseFields($blueprint['fields'], 'parseValidation');
            }

            if (isset($blueprint['sidebar']) && isset($blueprint['sidebar']['fields'])) {
                $rules = array_merge($rules, $this->parseFields($blueprint['sidebar']['fields'], 'parseValidation'));
            }

            if (isset($blueprint['sections'])) {
                foreach ($blueprint['sections'] as $section) {
                    if (isset($section['fields'])) {
                        $rules = array_merge($rules, $this->parseFields($section['fields'], 'parseValidation'));
                    }
                }
            }
        }

        return $rules;
    }

    private function parseValidation($field)
    {
        return isset($field['validation'])
            ? $field['validation']
            : 'nullable';
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

    public function relatedQuery($relationship)
    {
        $related = App::make($this->model)->$relationship()->getRelated();

        return $this->itemsQuery($related);
    }
}
