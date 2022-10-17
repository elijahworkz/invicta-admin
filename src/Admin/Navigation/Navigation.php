<?php

namespace Eteacher\InvictaAdmin\Admin\Navigation;

use Eteacher\InvictaAdmin\Admin\Models\Navigation as NavigationModel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Navigation
{
    public $items;

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

        $this->items = new NavigationItems;
        $this->collectResources($menu->tree);
        $this->items->getResources();

        return $this->buildTree($menu->tree);

        return $this->setCurrent($tree);
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
        return collect($branches)->map(function ($branch) use ($depth) {
            $children = empty($branch['children']) ? [] : $this->buildTree($branch['children'], $depth + 1);

            return [
                'title' => $branch['label'],
                'url' => $this->setUrl($branch),
                'children' => $children,
                'depth' => $depth,
                'css' => $branch['css'] ?? null,
                'is_external' => $this->setExternal($branch),
                'target' => $this->setTarget($branch),
            ];
        })->filter();
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

            $is_current = Str::of(request()->path())->rtrim('/')->start('/') == rtrim($branch['url'], '/');

            if (! empty($children) && ! $is_current) {
                $is_current = collect($children)->where('is_current', true)->IsNotEmpty();
            }

            $branch['is_current'] = $is_current;

            return $branch;
        });
    }
}
