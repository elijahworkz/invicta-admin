<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Invicta.Permission.Edit', [
            'actionUrl' => route('invicta.permission.update', ['group' => $request->group]),
        ]);
    }

    public function update(Request $request)
    {
        return redirect()->route('invicta.permission.edit', ['group' => $request->group]);
    }
}
