<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Facades\Permission;

class CorePermissions
{
    public function boot()
    {
        Permission::group('invicta')->label('Admin Panel')
            ->permissions([
                Permission::make('access invicta')->label('Access the Control Panel'),
            ]);

        $this->registerResourcesPermission();
    }

    public function registerResourcesPermission()
    {
        $resources = ResourceRegistrar::all();

        collect(array_values($resources))
            ->map(function ($resource) {
                return Permission::resource($resource);
            });
    }
}
