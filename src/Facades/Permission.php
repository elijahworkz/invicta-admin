<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Permissions\PermissionRegistrar;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Menu\Menu
 */
class Permission extends Facade
{
    protected static function getFacadeAccessor()
    {
        return PermissionRegistrar::class;
    }
}
