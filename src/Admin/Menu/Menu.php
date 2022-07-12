<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;

class Menu
{
    /**
     * An array of menu items.
     */
    protected $items = [];

    public function build(): Collection
    {
        return collect($this->items)
            ->filter(function ($item) {
                return $item;
            })
            ->map(function ($item) {
                return $item->render();
            });
    }

    /**
     * Creates an Inertia Link menu item.
     *
     * @return instance of MenuItem::class
     */
    public function item($name)
    {
        return $this->createItem($name);
    }

    /**
     * Creates an Inertia Link from Resource class.
     */
    public function resource($resourceClass)
    {
        $resource = App::make($resourceClass);

        ResourceRegistrar::put($resource->slug, $resource);

        return $this->createItem($resource->title)
            ->resource()
            ->route($resource->route())
            ->icon($resource->icon())
            ->badge($resource->badge());
    }

    /**
     * Shortcut to create a regural internal link.
     */
    public function link($name, $path)
    {
        $item = $this->createItem($name);
        $item->route($path)->link();

        return $item;
    }

    public function externalLink($name, $url)
    {
        $item = $this->createItem($name);
        $item->route($url)->link(true);

        return $item;
    }

    protected function createItem($name)
    {
        $item = MenuItem::make($name);

        $this->items[] = $item;

        return $item;
    }
}
