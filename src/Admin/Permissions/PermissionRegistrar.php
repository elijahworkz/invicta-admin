<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Illuminate\Support\Str;

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

    public function resource($resource)
    {
        $handle = $resource->handle();

        if (isset($this->groups[$handle])) {
            return false;
        }

        $label = Str::ucfirst($handle);

        $this->group($handle)->label($label)
            ->permissions(
                [
                    $this->make('view '.$handle)->children(
                        [
                            $this->make('edit '.$handle)->children(
                                array_merge(
                                    [
                                        $this->make('create '.$handle),
                                        $this->make('delete '.$handle),
                                    ],
                                    $resource->permissions()
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
