<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Facades\Permission;

class CorePermissions
{
    public function boot()
    {
        Permission::group('invicta')->label('Admin Panel')
            ->permissions([
                Permission::make('view invicta')->label('Access the Control Panel')->children([
                    Permission::make('test')->label('Test'),
                    Permission::make('test2')->label('Test2'),
                ]),
            ]);
    }
}