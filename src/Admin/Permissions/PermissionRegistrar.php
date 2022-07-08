<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

class PermissionRegistrar
{
    public $groups = [];

    public $permissions = [];

    public function group($handle)
    {
        $group = PermissionGroup::make($handle);

        $this->groups[] = $group;

        return $group;
    }

    public function make($ability)
    {
        return Permission::make($ability);
    }

    public function tree()
    {
        return collect($this->groups)
            ->map(function ($group) {
                return $group->build();
            });
    }
}
