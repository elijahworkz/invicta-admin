<?php

namespace Elijahworkz\InvictaAdmin\Admin\Navigation;

use Elijahworkz\InvictaAdmin\Admin\Models\Navigation as NavigationModel;
use Elijahworkz\InvictaAdmin\Events\NavigationError;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Navigation
{
    public $menu;

    public $items;

    public $shouldUpdateMenu;

    protected $navigationError = false;

    public function menu($handle)
    {
        if (config('invicta.cache_navigation')) {
            $tree = Cache::rememberForever('nav-'.$handle, function () use ($handle) {
                return $this->build($handle);
            });
        } else {
            $tree = $this->build($handle);
        }

        if ($this->navigationError) {
            NavigationError::dispatch($this->menu);
        }

        return $this->setCurrent($tree);
    }

    protected function build($handle)
    {
        $this->menu = NavigationModel::where('handle', $handle)->locale()->first();

        if (! $this->menu) {
            return [];
        }

        $tree = isset($this->menu->tree['error']) ? $this->menu->tree['branches'] : $this->menu->tree;

        if (! empty($tree)) {
            $this->items = new NavigationItems;
            $this->collectResources($tree);
            $this->items->getResources();

            return $this->buildTree($tree);
        }

        return [];
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
        $tree = collect($branches)->map(function ($branch) use ($depth) {
            $children = empty($branch['children']) ? [] : $this->buildTree($branch['children'], $depth + 1);

            $url = $this->setUrl($branch);

            if (is_null($url) && ! isset($branch['error'])) {
                $this->navigationError = true;

                return [];
            }

            return [
                'title' => $branch['label'],
                'url' => $url,
                'hasChildren' => ! empty($children),
                'children' => $children,
                'depth' => $depth,
                'css' => $branch['css'] ?? null,
                'icon' => $branch['icon'] ?? null,
                'text' => $branch['text'] ?? null,
                'is_external' => $this->setExternal($branch),
                'target' => $this->setTarget($branch),
            ];
        })->filter();

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
        return (isset($item['external']) && $item['external']) ? '_blank' : '_self';
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

    public function handleNavigationError($menu)
    {
        $this->items = new NavigationItems;
        $tree = isset($menu->tree['error']) ? $menu->tree['branches'] : $menu->tree;
        $error = $menu->tree['error'] ?: false;

        $this->collectResources($tree);

        $this->items->getResources();
        $this->shouldUpdateMenu = false;

        if (! $error) {
            $tree = $this->checkBranches($tree);

            if ($this->shouldUpdateMenu) {
                $menu->tree = ['error' => true, 'branches' => $tree];
                $menu->save();
            }
        }
    }

    private function checkBranches($branches)
    {
        return collect($branches)->map(function ($branch) {
            $branch['children'] = empty($branch['children']) ? [] : $this->checkBranches($branch['children']);

            if ($branch['handle'] !== 'custom' && ! $this->items->currentItem($branch)) {
                $this->shouldUpdateMenu = true;
                $branch['error'] = true;
            }

            return $branch;
        })
            ->toArray();
    }
}
