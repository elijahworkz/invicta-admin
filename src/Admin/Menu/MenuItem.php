<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use Eteacher\InvictaAdmin\Admin\Traits\Makeable;
use Illuminate\Support\Str;

class MenuItem
{
    use Makeable;

    public $url = '/';

    public $icon = 'label-alt';

    public $inertia = true;

    public $abilities;

    public $badge = null;

    public $group = null;

    public $children = null;

    public $hasDivider = false;

    public function __construct(public $name)
    {
    }

    public function route($path)
    {
        $this->url = $path;

        return $this;
    }

    public function can($ability)
    {
        return $this;
    }

    public function icon($name)
    {
        return $this;
    }

    public function badge($value)
    {
        $this->badge = is_callable($value)
            ? $value()
            : $value;

        return $this;
    }

    public function divider()
    {
        $this->hasDivider = true;

        return $this;
    }

    public function group($name)
    {
        $this->group = $name;

        return $this;
    }

    public function link($external = false)
    {
        $this->inertia = false;
        $this->external = $external;

        return $this;
    }

    public function children(array $items)
    {
        // we should get an array of menuItem instances here
        $this->children = $items;
    }

    public function render($child = false)
    {
        // FIrst - filter for authorization
        //
        // In the end I need an array with each item converted
        // into an object with parameters
        // 1. icon
        // 2. path
        // 3. link
        // 4.
        //
        $url = $this->inertia
            ? Str::start(config('invicta.path'), $this->url)
            : $this->url;

        return [
            'name' => $this->name,
            'url' => $url,
            'icon' => $this->icon,
            'badge' => $this->badge,
            'inertia' => $this->inertia,
            'group' => $this->group,
            'divider' => $this->hasDivider,
            'children' => $this->children
                ? collect($this->children)->map(function ($item) {
                    return $item->render(true);
                })
                : null,
        ];
    }
}
