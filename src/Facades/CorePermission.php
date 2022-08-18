<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Permissions\CorePermissions as CorePermissionRegistrar;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Menu\Menu
 */
class CorePermission extends Facade
{
    protected static function getFacadeAccessor()
    {
        return CorePermissionRegistrar::class;
    }
}
