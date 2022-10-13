<?php

namespace Eteacher\InvictaAdmin\Admin\Navigation;

use Eteacher\InvictaAdmin\Admin\Models\Navigation as NavigationModel;
use Illuminate\Support\Str;

class Navigation
{
    public $items;

    public function menu($handle)
    {
        if (config('invicta.cache_navigation')) {
            return Cache::rememberForever('nav-'.$handle, function () use ($handle) {
                return $this->build($handle);
            });
        }

        return $this->build($handle);
    }

    public function build($handle)
    {
        $menu = NavigationModel::where('handle', $handle)->first();

        $this->items = new NavigationItems;
        $this->collectResources($menu->tree);
        $this->items->getResources();

        $tree = $this->buildTree($menu->tree);

        return $tree;

        // 1. walk through tree
        // 2. reduce all resources
    }

    public function collectResources($tree)
    {
        foreach ($tree as $branch) {
            $this->items->setItem($branch);

            if (! empty($branch['children'])) {
                $this->collectResources($branch['children']);
            }
        }
    }

    public function buildTree($branches, $depth = 1)
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

    private function setUrl($item)
    {
        if ($item['handle'] == 'custom') {
            return $item['url'] ?? '';
        }

        return $this->items->url($item);
    }

    public function setExternal($item)
    {
        return (isset($item['url'])) ? Str::of($item['url'])->contains('http') : false;
    }

    private function setTarget($item)
    {
        return (isset($item['external']) && $item['external']) ? '_blank' : '';
    }
}
