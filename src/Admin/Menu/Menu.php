<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use Illuminate\Support\Collection;

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
    public function resource($resource)
    {
        // should do more work here
        // need to get the resource
        // 1. get the menu name
        // 2. get slug
        // 3. build Menu Item with those values
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
