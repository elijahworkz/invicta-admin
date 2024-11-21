<?php

namespace Elijahworkz\InvictaAdmin\Facades;

use Elijahworkz\InvictaAdmin\Admin\Menu\Menu as AdminMenu;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Elijahworkz\InvictaAdmin\Admin\Menu\Menu
 */
class Menu extends Facade
{
    protected static function getFacadeAccessor()
    {
        return AdminMenu::class;
    }
}
