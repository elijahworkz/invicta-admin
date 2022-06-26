<?php

namespace Eteacher\InvictaAdmin\Admin\Facades;

use Eteacher\InvictaAdmin\Admin\Menu\Menu as AdminMenu;
use Illuminate\Support\Facades\Facade;

/**
 * @method static void extend(\Closure $callback)
 * @method static \Statamic\CP\Navigation\NavItem create($name)
 * @method static mixed item($name)
 * @method static mixed findOrCreate($section, $name)
 * @method static self remove($section, $name = null)
 * @method static array items()
 * @method static \Illuminate\Support\Collection build()
 * @method static self buildChildren()
 *
 * @see \Statamic\CP\Navigation\Nav
 */
class Menu extends Facade
{
    protected static function getFacadeAccessor()
    {
        return AdminMenu::class;
    }
}
