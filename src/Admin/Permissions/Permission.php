<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Admin\Traits\Makeable;
use Illuminate\Support\Str;

class Permission
{
    use Makeable;

    public $children = [];

    public $label = null;

    public function __construct(public $ability)
    {
    }

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

    public function build($child = false)
    {
        $label = $this->label
            ? $this->label
            : Str::title($this->ability);

        return [
            'permission' => $this->ability,
            'label' => $label,
            'children' => $this->children
                ? collect($this->children)->map(function ($item) {
                    return $item->build(true);
                })
                : null,
        ];
    }
}
