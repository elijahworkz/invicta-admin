<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use Eteacher\InvictaAdmin\Admin\Models\Group;
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
     * Creates Permission Menu Item with group links as children items.
     *
     * @return instance of MenuItem::class
     */
    public function permissions($name = 'Permissions')
    {
        return $this->createItem($name)->icon('shield-key')->children($this->permissionItems());
    }

    /**
     * Get Permission children Menu Items.
     *
     * @return array where items instance of MenuItem::class
     */
    protected function permissionItems()
    {
        $groups = Group::orderBy('id', 'desc')->get();

        $groupMenuItems = [];

        foreach ($groups as $group) {
            $route = config('invicta.path').'/group/'.$group->id.'/permission';

            $groupMenuItems[] = MenuItem::make($group->title)->route($route);
        }

        return $groupMenuItems;
    }

    /**
     * Creates an Inertia Link from Resource class.
     */
    public function resource($resourceClass)
    {
        $item = MenuItem::resource($resourceClass);

        $this->items[] = $item;

        return $item;
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
