<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvictaAdminController extends Controller
{
    public function home()
    {
        return Inertia::render('Invicta.Home', []);
    }

    public function index(ResourceRequest $request)
    {
        $resource = $request->resource();

        return Inertia::render('Invicta.Resource', ['resource' => $resource]);
    }

    public function edit(Request $request, $resource)
    {
        // code...
    }

    public function destroy(Request $request, $resource)
    {
        // code...
    }
}
