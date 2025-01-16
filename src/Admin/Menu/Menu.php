<?php

namespace Elijahworkz\InvictaAdmin\Admin\Menu;

use Elijahworkz\InvictaAdmin\Admin\Models\Group;
use Elijahworkz\InvictaAdmin\Admin\Models\Resources\Asset;
use Elijahworkz\InvictaAdmin\Admin\Models\Resources\Navigation;
use Elijahworkz\InvictaAdmin\Facades\Permission;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class Menu
{
    /**
     * An array of menu items.
     */
    protected $items = [];

    public function build(): Collection
    {
        // First we run through possible callbacks
        $this->items = collect($this->items)->map(function ($item) {
            if ($item->callback) {
                $callback = $item->callback;
                $item = $item->$callback();
            }

            return $item;
        })->filter();

        return $this
            ->authorizeItems()
            ->authorizeChildren()
            ->render();
    }

    /** @return mixed  */
    public function render()
    {
        return collect($this->items)->map(function ($item) {
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
     * Creates Tools Menu Item
     *
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function tools($items = []): MenuItem
    {
        // items is an array of handles.
        // If need to change title of one of children item need to put array where `key` is handle and `value` is title.
        if (! count($items)) {
            return null;
        }

        $children = [];
        foreach ($items as $item) {
            if (is_array($item)) {
                $itemHandle = array_key_first($item);
                $itemTitle = $item[$itemHandle];
            } else {
                $itemHandle = $item;
                $itemTitle = Str::ucfirst($item);
            }

            $route = '/tools/'.$itemHandle;
            $children[] = MenuItem::make($itemTitle)->route($route)->can('edit '.$itemHandle);
        }

        return $this->createItem('Tools')
            ->icon('tools')
            ->children($children)
            ->can('view tools');
    }

    /**
     * Creates Global setting menu item
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function globalSettings($name = 'Site Settings')
    {
        $item = MenuItem::globals($name);

        $this->items[] = $item;

        return $item;
    }

    public function globalSetting($handle)
    {
        $item = MenuItem::global($handle);
        $this->items[] = $item;

        return $item;
    }

    /**
     * Creates Permission Menu Item with group links as children items.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function permissions($name = 'Permissions')
    {
        $item = MenuItem::permissions($name);

        $this->items[] = $item;

        return $item;
    }

    /**
     * Get Permission children Menu Items.
     *
     * @return array Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    protected function permissionItems()
    {
        $groupMenuItems = [];

        if (! Schema::hasTable('groups')) {
            return $groupMenuItems;
        }

        $groups = Group::orderBy('id', 'desc')->get();

        foreach ($groups as $group) {
            $route = '/group/'.$group->id.'/permission';

            $groupMenuItems[] = MenuItem::make($group->title)->route($route)->can('edit permissions');
        }

        return $groupMenuItems;
    }

    /**
     * Creates an Inertia Link from Resource class.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function resource($resourceClass): MenuItem
    {
        $item = MenuItem::resource($resourceClass);

        $this->items[] = $item;

        return $item;
    }

    /**
     * Shortcut to create navigation menu item.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function navigation($name = 'Navigation'): MenuItem
    {
        $item = MenuItem::resource(Navigation::class);
        $item->label($name);

        $this->items[] = $item;

        return $item;
        // return $this->createItem($name)
        //     ->icon('routes')
        //     ->can('view navigation')
        //     ->route('/resource/navigation');
    }

    /**
     * Shortcut to create assets menu item.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function assets($name = 'Assets'): MenuItem
    {
        $item = MenuItem::resource(Asset::class);
        $item->label($name);

        $this->items[] = $item;

        return $item;
    }

    /**
     * Shortcut to create a regural internal link.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    public function link($name, $path)
    {
        $item = $this->createItem($name);
        $item->route($path)->link();

        return $item;
    }

    /**
     * Shortcut to create an external link.
     */
    public function externalLink($name, $url)
    {
        $item = $this->createItem($name);
        $item->route($url)->link(true);

        return $item;
    }

    /**
     * Create a menu item.
     *
     * @return Elijahworkz\InvictaAdmin\Admin\Menu\MenuItem
     */
    protected function createItem($name): MenuItem
    {
        $item = MenuItem::make($name);

        $this->items[] = $item;

        return $item;
    }

    /**
     * Authorize root menu items.
     *
     * @return $this
     */
    protected function authorizeItems()
    {
        $this->items = $this->filterAuthorizedNavItems($this->items);

        return $this;
    }

    /**
     * Authorize children metu items.
     *
     * @return $this
     */
    protected function authorizeChildren()
    {
        collect($this->items)
            ->each(function ($item) {
                if ($item->children) {
                    $item->children($this->filterAuthorizedNavItems($item->children)->toArray());
                }
            });

        return $this;
    }

    /**
     * Filter authorized nav items.
     *
     * @param  mixed  $items
     * @return \Illuminate\Support\Collection
     */
    protected function filterAuthorizedNavItems($items)
    {
        return collect($items)
            ->filter(function ($item) {
                return $item->can()
                    ? optional(Auth::user())->hasPermission($item->can()) === true ? true : null
                    : true;
            })
            ->values();
    }
}
