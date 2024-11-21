<?php

namespace Elijahworkz\InvictaAdmin\Admin\Permissions;

use Elijahworkz\InvictaAdmin\Admin\Traits\Makeable;

class PermissionGroup
{
    use Makeable;

    public $label = null;

    public $permissions = [];

    public function __construct(public $handle) {}

    public function label($label)
    {
        $this->label = $label;

        return $this;
    }

    public function permissions(array $items)
    {
        $this->permissions = $items;
    }

    public function build()
    {
        return [
            'handle' => $this->handle,
            'label' => $this->label,
            'permissions' => collect($this->permissions)
                ->map(function ($permission) {
                    return $permission->build();
                }),
        ];
    }
}
