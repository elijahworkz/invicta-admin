<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Models\Group;
use Eteacher\InvictaAdmin\Facades\Permission;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PermissionController extends Controller
{
    public function edit(Request $request, Group $group)
    {
        $this->authorize('edit permissions');

        $groupPermission = $group->permissions()->pluck('ability');
        $response = [
            'permissions' => $groupPermission,
            'title' => $group->title,
        ];

        if ($request->tree) {
            $response['tree'] = Permission::tree();
        }

        return $response;
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

        return response()->json(['message' => [
            'type' => 'success',
            'title' => 'Updated',
        ]]);
    }
}