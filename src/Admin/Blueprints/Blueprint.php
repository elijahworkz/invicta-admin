<?php

namespace Elijahworkz\InvictaAdmin\Admin\Blueprints;

use Illuminate\Support\Arr;
use Illuminate\Support\Fluent;

class Blueprint extends Fluent
{
    protected $item;

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

        $fields = Arr::has($this, 'fields') ? $this->fields : [];

        if (count($fields)) {
            $sections[] = [
                'id' => '__main',
                'title' => 'Main',
                'fields' => $fields,
            ];

            unset($this->fields);

            if (! Arr::has($this, 'settings')) {
                $this->settings([]);
            }
        }

        $sections[] = $newSection;

        $this->sections($sections);
    }

    public function parseForFieldsets($item = null)
    {
        $this->item = $item;

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
                if (isset($field['fields'])) {
                    $field['fields'] = [...$this->getFieldsets($field['fields'])];
                }
                $parsed[] = $field;
            } else {
                $fieldsetFields = $this->getFieldset($field['fieldset']);

                if (isset($field['id'])) {
                    $field['fields'] = [...$this->getFieldsets($fieldsetFields)];
                    unset($field['fieldset']);
                    $parsed[] = $field;
                } else {
                    $parsed = [...$parsed, ...$this->getFieldsets($fieldsetFields)];
                }
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
