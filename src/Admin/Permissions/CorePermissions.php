<?php

namespace Elijahworkz\InvictaAdmin\Admin\Permissions;

use Elijahworkz\InvictaAdmin\Facades\Permission;

class CorePermissions
{
    public static function boot()
    {
        Permission::group('invicta')->label('Admin Panel')
            ->permissions([
                Permission::make('access invicta')->label('Access the Control Panel'),
                Permission::make('view navigation')->children([
                    Permission::make('create new navigation'),
                    Permission::make('edit navigation'),
                    Permission::make('delete navigation'),
                ]),
                Permission::make('view tools')->children([
                    Permission::make('run commands'),
                ]),
            ]);
    }
}
