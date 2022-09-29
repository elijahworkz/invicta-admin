<?php

namespace Eteacher\InvictaAdmin\Admin\Blueprints;

use Illuminate\Support\Arr;
use Illuminate\Support\Fluent;

class Blueprint extends Fluent
{
    // protected $blueprint;

    public function addToSidebar($fields)
    {
        $sidebar = Arr::has($this, 'sidebar');

        $fields = Arr::isAssoc($fields)
            ? [$fields]
            : $fields;

        if (! $sidebar) {
            $this->sidebar(['fields' => $fields]);
        } else {
            $sidebar = $this->sidebar;
            $sidebar['fields'] = [...$sidebar['fields'], ...$fields];
            $this->sidebar($sidebar);
        }
    }

    public function addSection($newSection)
    {
        $sections = Arr::has($this, 'sections') ? $this->sections : [];

        $sections[] = $newSection;

        $this->sections($sections);
    }

    public function parseForFieldsets()
    {
        if (Arr::has($this, 'fields')) {
            $fields = $this->fields;

            $this->fields($this->getFieldsets($fields));
        }

        if (Arr::has($this, 'sidebar')) {
            $sidebar = $this->sidebar;
            $sidebar['fields'] = $this->getFieldsets($sidebar['fields']);
            $this->sidebar($sidebar);
        }

        if (Arr::has($this, 'sections')) {
            $sections = $this->sections;

            foreach ($sections as $key => $section) {
                if (isset($section['fields'])) {
                    $sections[$key]['fields'] = $this->getFieldsets($section['fields']);
                }
            }
            $this->sections($sections);
        }
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
}
