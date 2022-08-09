<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function home()
    {
        return Inertia::render('Invicta.Home', []);
    }

    public function index(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource', ['resource' => $request->resourceList()]);
    }

    public function create(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource.Create', ['resource' => $request->createNew()]);
    }

    public function edit(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource.Edit', ['resource' => $request->resourceItem()]);
    }

    public function store()
    {
        // code...
    }

    public function update(ResourceRequest $request)
    {
        // validate
        $validated = $request->validate();
    }

    public function destroy(ResourceRequest $request)
    {
        // ResourceRequest $request
    }
}
