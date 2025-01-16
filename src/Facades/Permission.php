<?php

namespace Elijahworkz\InvictaAdmin\Facades;

use Elijahworkz\InvictaAdmin\Admin\Permissions\PermissionRegistrar;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Elijahworkz\InvictaAdmin\Admin\Permissions\PermissionRegistrar
 */
class Permission extends Facade
{
    protected static function getFacadeAccessor()
    {
        return PermissionRegistrar::class;
    }
}
