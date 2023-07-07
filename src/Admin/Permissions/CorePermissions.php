<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Admin\Models\GlobalSetting;
use Eteacher\InvictaAdmin\Facades\Permission;

class CorePermissions
{
    public static function boot()
    {
        $handle = 'global_settings';
        $globalSettings = GlobalSetting::select('id', 'title')->get();

        $globalSettingItems = [];
        foreach ($globalSettings as $globalSetting) {
            $globalSettingItems[] = Permission::make("edit global_settings_item $globalSetting->id")->label('Edit '.$globalSetting->title);
        }

        Permission::group($handle)->label('Global Settings')
            ->permissions([
                Permission::make("view $handle")->children([
                    Permission::make("create new $handle"),
                    Permission::make("edit $handle"),
                    Permission::make("edit $handle items")->label('Edit particular Global Settings')->children($globalSettingItems),
                    Permission::make("delete $handle"),

                ]),
            ]);

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
