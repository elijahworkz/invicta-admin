<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
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

    public function create(ResourceRequest $request)
    {
        // code...
    }

    public function edit(ResourceRequest $request)
    {
        $resource = $request->resourceItem();

        return Inertia::render('Invicta.Resource.Edit', ['resource' => $resource]);
    }

    public function update(ResourceRequest $request)
    {
        // what do we need...
        $validated = $request->validate();
    }

    public function destroy(ResourceRequest $request)
    {
        // ResourceRequest $request
    }
}
