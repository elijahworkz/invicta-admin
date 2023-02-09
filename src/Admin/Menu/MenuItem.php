<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use BadMethodCallException;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Admin\Traits\Makeable;
use Eteacher\InvictaAdmin\Facades\Permission;
use Eteacher\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\Facades\App;

class MenuItem
{
    use Makeable;

    public $url = '/';

    public $inertia = true;

    public $icon = null;

    public $badge = null;

    public $group = null;

    public $children = false;

    public $hasDivider = false;

    protected $resource = false;

    protected $ability;

    /**
     *  Make new Menu Item.
     */
    public function __construct(public $name)
    {
    }

    public function label($value)
    {
        $this->name = $value;

        return $this;
    }

    public function route($path)
    {
        $this->url = $path;

        return $this;
    }

    public function can($ability = null)
    {
        if (is_null($ability)) {
            return $this->ability;
        }

        $this->ability = $ability;

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

    public static function resource($resourceClass)
    {
        $resource = App::make($resourceClass);
        ResourceRegistrar::put($resource->handle(), $resource);

        Permission::resource($resource);
        $viewResource = 'view '.$resource->handle();

        return (new static($resource->menuTitle()))
            ->can($viewResource)
            ->route($resource->route())
            ->icon($resource->icon())
            ->badge($resource->badge());
    }

    public function children(array $items)
    {
        if ($this->resource) {
            throw new BadMethodCallException('You cannot add children to resource type menu item.');
        }
        // we should get an array of menuItem instances here
        $this->children = $items;

        return $this;
    }

    public function render($child = false)
    {
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
