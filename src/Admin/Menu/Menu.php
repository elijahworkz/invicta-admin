<?php

namespace Eteacher\InvictaAdmin\Admin\Menu;

class Menu
{
    protected $items = [];

    public function item($item)
    {
        $this->items[] = $item;
    }

    public function build()
    {
        return $this->items;
    }
}
