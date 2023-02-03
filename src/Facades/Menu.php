<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Menu\Menu as AdminMenu;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Menu\Menu
 */
class Menu extends Facade
{
    protected static function getFacadeAccessor()
    {
        return AdminMenu::class;
    }
}
