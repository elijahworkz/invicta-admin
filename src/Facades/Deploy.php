<?php

namespace Eteacher\InvictaAdmin\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Menu\Menu
 */
class Deploy extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'deploy';
    }
}
