<?php

namespace Elijahworkz\InvictaAdmin\Admin\Navigation;

use Illuminate\Support\Facades\DB;

class NavigationItems
{
    public $resources;

    protected $items;

    public function setItem($item)
    {
        if ($item['handle'] !== 'custom') {
            $this->resources[$item['handle']][] = $item['id'];
        }
    }

    public function getResources()
    {
        if (! $this->resources) {
            return;
        }

        foreach ($this->resources as $handle => $ids) {
            $this->items[$handle] = DB::table($handle)->select('id', 'uri')->whereIn('id', $ids)->get();
        }
    }

    public function url($item)
    {
        $currentItem = $this->currentItem($item);

        return $currentItem ? $currentItem->uri : null;
    }

    public function currentItem($item)
    {
        return $this->items[$item['handle']]->firstWhere('id', $item['id']);

    }
}
