<?php

namespace Eteacher\InvictaAdmin\Admin\Navigation;

use Eteacher\InvictaAdmin\Admin\Models\Navigation as NavigationModel;
use Eteacher\InvictaAdmin\Events\NavigationClearing;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Navigation
{
    public $items;

    public $shouldUpdateMenu;

    public function clearNavigations()
    {

        $menus = NavigationModel::all();

        $this->items = new NavigationItems;

        foreach ($menus as $menu) {
            if (! empty($menu->tree)) {
                $this->collectResources($menu->tree);
            }
        }

        $this->items->getResources();

        foreach ($menus as $menu) {
            $this->shouldUpdateMenu = false;
            $tree = $menu->tree;

            if (! empty($tree)) {
                $newTree = $this->filterTree($tree);
                if ($this->shouldUpdateMenu) {
                    $menu->tree = $newTree;
                    $menu->save();
                }
            }
        }

    }

    public function filterTree($tree)
    {
        $newTree = collect($tree)->map(
            function ($branch) {
                $branch['children'] = empty($branch['children']) ? [] : $this->filterTree($branch['children']);

                if ($branch['handle'] !== 'custom' && ! $this->items->currentItem($branch)) {
                    $this->shouldUpdateMenu = true;

                    return [];
                }

                return $branch;
            }
        )
            ->filter()
            ->toArray();

        return $newTree;
    }

    public function menu($handle)
    {
        if (config('invicta.cache_navigation')) {
            $tree = Cache::rememberForever('nav-'.$handle, function () use ($handle) {
                return $this->build($handle);
            });
        } else {
            $tree = $this->build($handle);
        }

        return $this->setCurrent($tree);
    }

    protected function build($handle)
    {
        $menu = NavigationModel::where('handle', $handle)->first();

        if (! $menu) {
            return [];
        }

        $this->items = new NavigationItems;
        $this->collectResources($menu->tree);
        $this->items->getResources();

        return $this->buildTree($menu->tree);
    }

    protected function collectResources($tree)
    {
        foreach ($tree as $branch) {
            $this->items->setItem($branch);

            if (! empty($branch['children'])) {
                $this->collectResources($branch['children']);
            }
        }
    }

    protected function buildTree($branches, $depth = 1)
    {
        $clearMenus = false;
        $tree = collect($branches)->map(function ($branch) use ($depth, &$clearMenus) {
            $children = empty($branch['children']) ? [] : $this->buildTree($branch['children'], $depth + 1);

            $url = $this->setUrl($branch);

            if (is_null($url) && ! count($children)) {
                $clearMenus = true;

                return [];
            }

            return [
                'title' => $branch['label'],
                'url' => $this->setUrl($branch),
                'hasChildren' => ! empty($children),
                'children' => $children,
                'depth' => $depth,
                'css' => $branch['css'] ?? null,
                'is_external' => $this->setExternal($branch),
                'target' => $this->setTarget($branch),
            ];
        })->filter();

        if ($clearMenus) {
            NavigationClearing::dispatch();
        }

        return $tree;

    }

    protected function setUrl($item)
    {
        if ($item['handle'] == 'custom') {
            return $item['url'] ?? '';
        }

        return $this->items->url($item);
    }

    protected function setExternal($item)
    {
        return (isset($item['url'])) ? Str::of($item['url'])->contains('http') : false;
    }

    protected function setTarget($item)
    {
        return (isset($item['external']) && $item['external']) ? '_blank' : '';
    }

    protected function setCurrent($branches, $child = false)
    {
        return collect($branches)->map(function ($branch) {
            $children = empty($branch['children']) ? [] : $this->setCurrent($branch['children'], true);
            $branch['children'] = $children;

            $is_current = Str::of(request()->path())->rtrim('/')->start('/') == Str::of($branch['url'])->rtrim('/');

            if (! empty($children) && ! $is_current) {
                $is_current = collect($children)->where('is_current', true)->IsNotEmpty();
            }

            $branch['is_current'] = $is_current;

            return $branch;
        });
    }
}
