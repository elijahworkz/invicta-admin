<?php

namespace Eteacher\InvictaAdmin\Policies;

use App\Models\User;

class ResourcePolicy
{
    public function index(User $user, $resource)
    {
        return $this->view($user, $resource);
    }

    public function view(User $user, $resource)
    {
        return $user->hasPermission('view '.$resource->handle());
    }

    public function edit(User $user, $resource, $model)
    {
        return $user->hasPermission('edit '.$resource->handle());
    }

    public function update(User $user, $resource, $model)
    {
        return $this->edit($user, $resource, $model);
    }

    public function create(User $user, $resource)
    {
        return $user->hasPermission('create '.$resource->handle());
    }

    public function store(User $user, $resource)
    {
        return $this->create($user, $resource);
    }

    public function delete(User $user, $resource, $model)
    {
        return $user->hasPermission('delete '.$resource->handle());
    }
}
