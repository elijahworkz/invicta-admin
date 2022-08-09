<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use BadMethodCallException;
use Eteacher\InvictaAdmin\Admin\Traits\Makeable;
use Eteacher\InvictaAdmin\InvictaAdmin;

class MenuItem
{
    use Makeable;

    public $url = '/';

    public $inertia = true;

    public $icon = null;

    public $abilities;

    public $badge = null;

    public $group = null;

    public $children = false;

    public $hasDivider = false;

    protected $resource = false;

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
        $this->icon = InvictaAdmin::svg($name);

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

    public function resource()
    {
        $this->resource = true;

        return $this;
    }

    public function children(array $items)
    {
        if ($this->resource) {
            throw new BadMethodCallException('You cannot add children to resource type menu item.');
        }
        // we should get an array of menuItem instances here
        $this->children = $items;
    }

    public function render($child = false)
    {
        // FIrst - filter for authorization
        //
        //

        return [
            'name' => $this->name,
            'url' => $this->url,
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
