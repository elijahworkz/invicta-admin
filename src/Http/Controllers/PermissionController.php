<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Models\Group;
use Eteacher\InvictaAdmin\Facades\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function edit(Group $group)
    {
        $this->authorize('edit permissions');

        $permissionTree = Permission::tree();

        $groupPermission = $group->permissions()->pluck('ability');

        return Inertia::render('Invicta.Permission.Edit', [
            'tree' => $permissionTree,
            'permissions' => $groupPermission,
            'actionUrl' => route('invicta.permission.update', ['group' => $group->id]),
        ]);
    }

    public function update(Request $request, Group $group)
    {
        $this->authorize('edit permissions');

        $request->validate([
            'permissions' => 'array|nullable',
        ]);

        $permisssions = Arr::map($request->permissions, function ($value) {
            return ['ability' => $value];
        });

        $group->permissions()->delete();
        $group->permissions()->createMany($permisssions);

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Updated',
        ]);
    }
}
