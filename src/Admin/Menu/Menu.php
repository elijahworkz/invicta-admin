<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

use Eteacher\InvictaAdmin\Admin\Models\GlobalSetting;
use Eteacher\InvictaAdmin\Admin\Models\Group;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Statamic\CP\Navigation\Nav;

class Menu
{
    /**
     * An array of menu items.
     */
    protected $items = [];

    public function build(): Collection
    {
        return $this
            ->authorizeItems()
            ->authorizeChildren()
            ->render();
    }

    public function render()
    {
        return $this->items->map(function ($item) {
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
     * @return instance of MenuItem::class
     */
    public function tools($items = [])
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

            $route = config('invicta.path').'/tools/'.$itemHandle;
            $children[] = MenuItem::make($itemTitle)->route($route)->can('edit '.$itemHandle);
        }

        return $this->createItem('Tools')
            ->icon('tools')
            ->children($children)
            ->can('view tools');
    }

    public function globalSettings($name = 'Site Settings')
    {
        $globals = GlobalSetting::select(['id', 'title'])
            ->whereNot('handle', 'course-reviews')
            ->get();
        $items = [];

        foreach ($globals as $globalItem) {
            $itemPermission = "edit global_settings_item $globalItem->id";

            $route = config('invicta.path').'/resource/global_settings/'.$globalItem->id.'/edit';

            $items[] = MenuItem::make($globalItem->title)->can([$itemPermission, 'edit global_settings'])->route($route);
        }

        $item = $this->createItem($name)
            ->icon('settings')
            ->children($items)
            ->can('view global_settings');

        return $item;
    }

    /**
     * Creates Permission Menu Item with group links as children items.
     *
     * @return instance of MenuItem::class
     */
    public function permissions($name = 'Permissions')
    {
        $groups = $this->permissionItems();

        if (! count($groups)) {
            return null;
        }

        return $this->createItem($name)
            ->icon('shield-key')
            ->children($groups)
            ->can('view permissions');
    }

    /**
     * Get Permission children Menu Items.
     *
     * @return array where items instance of MenuItem::class
     */
    protected function permissionItems()
    {
        $groupMenuItems = [];

        if (! Schema::hasTable('groups')) {
            return $groupMenuItems;
        }

        $groups = Group::orderBy('id', 'desc')->get();

        foreach ($groups as $group) {
            $route = config('invicta.path').'/group/'.$group->id.'/permission';

            $groupMenuItems[] = MenuItem::make($group->title)->route($route)->can('edit permissions');
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

    public function navigation($name = 'Navigation')
    {
        return $this->createItem($name)
            ->icon('routes')
            ->can('view navigation')
            ->route(config('invicta.path').'/navigation');
    }

    public function assets($name = 'Assets')
    {
        return $this->createItem($name)
            ->icon('images')
            ->can('view assets')
            ->route(config('invicta.path').'/assets');
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
