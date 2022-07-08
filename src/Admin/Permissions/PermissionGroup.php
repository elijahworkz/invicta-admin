<?php

namespace Eteacher\InvictaAdmin\Admin\Permissions;

use Eteacher\InvictaAdmin\Admin\Traits\Makeable;

class PermissionGroup
{
    use Makeable;

    public $permissions = [];

    public function __construct(public $handle)
    {
    }

    public function permissions(array $items)
    {
        $this->permissions = $items;
    }

    public function build()
    {
        return [
            'handle' => $this->handle,
            'permissions' => collect($this->permissions)
                ->map(function ($permission) {
                    return $permission->build();
                }),
        ];
    }
}
