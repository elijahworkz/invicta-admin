<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Facades\Permission;

class CorePermissions
{
    public static function boot()
    {
        Permission::group('invicta')->label('Admin Panel')
            ->permissions([
                Permission::make('view invicta')->label('Access the Control Panel')->children([
                    Permission::make('test')->label('Test'),
                    Permission::make('test2')->label('Test2'),
                ]),
                Permission::make('view navigation')->children([
                    Permission::make('create new navigation'),
                    Permission::make('edit navigation'),
                    Permission::make('delete navigation'),
                ]),
            ]);
    }
}
