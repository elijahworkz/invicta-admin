<?php

namespace Elijahworkz\InvictaAdmin\Admin\Permissions;

class PermissionRegistrar
{
    public $groups = [];

    public $permissions = [];

    public function group($handle)
    {
        $group = PermissionGroup::make($handle);

        $this->groups[$handle] = $group;

        return $group;
    }

    public function setPermissions($handle, $permissions = [])
    {
        if (isset($this->groups[$handle])) {
            return false;
        }

        $label = str($handle)->ucfirst()->replace('_', ' ');

        $this->group($handle)->label($label)
            ->permissions(
                [
                    $this->make('view '.$handle)->label('View '.$label)->children(
                        [
                            $this->make('edit '.$handle)->label('Edit '.$label)->children(
                                array_merge(
                                    [
                                        $this->make('create '.$handle)->label('Create '.$label),
                                        $this->make('delete '.$handle)->label('Delete '.$label),
                                    ],
                                    $permissions
                                )
                            ),
                        ]
                    ),
                ]
            );
    }

    public function make($ability)
    {
        return Permission::make($ability);
    }

    public function tree()
    {
        return collect(array_values($this->groups))
            ->map(
                function ($group) {
                    return $group->build();
                }
            );
    }
}
