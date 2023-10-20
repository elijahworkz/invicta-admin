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

    public $external = false;

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

    protected function getBadge()
    {
        return $this->resource
            ? $this->resource->badge() ?? null
            : $this->badge;
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
        $this->external = $external;

        return $this;
    }

    /**
     * set permission CRUD to the group with current handle
     *
     * @param  array  $permissions
     * @return $this
     */
    public function permissions($handle, $permissions = [])
    {
        Permission::setPermissions($handle, $permissions);

        $this->can('view '.$handle);

        return $this;
    }

    public static function resource($resourceClass)
    {
        $resource = App::make($resourceClass);
        ResourceRegistrar::put($resource->handle(), $resource);

        $self = new static($resource->menuTitle());

        $self->resource = $resource;

        return $self
            ->permissions($resource->handle(), $resource->permissions())
            ->route($resource->route())
            ->icon($resource->icon());
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
            'badge' => $this->getBadge(),
            'external' => $this->external,
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
