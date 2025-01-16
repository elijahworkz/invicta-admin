<?php

namespace Elijahworkz\InvictaAdmin\Admin\Permissions;

use Elijahworkz\InvictaAdmin\Admin\Traits\Makeable;
use Illuminate\Support\Str;

class Permission
{
    use Makeable;

    public $children = [];

    public $label = null;

    public function __construct(public $ability) {}

    public function children($items)
    {
        $this->children = $items;

        return $this;
    }

    public function label($label)
    {
        $this->label = $label;

        return $this;
    }

    public function build()
    {
        $label = $this->label
            ? $this->label
            : Str::headline($this->ability);

        return [
            'permission' => $this->ability,
            'label' => $label,
            'children' => $this->children
                ? collect($this->children)->map(function ($item) {
                    return $item->build();
                })
                : null,
        ];
    }
}
