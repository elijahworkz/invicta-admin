<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Facades\Permission;

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
                    Permission::make('edit cache'),
                    Permission::make('deploy site'),
                ]),
            ]);
    }
}
