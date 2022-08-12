<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Illuminate\Support\Facades\Redirect;
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
        return Inertia::render('Invicta.Resource.Create', ['resource' => $request->createItem()]);
    }

    public function edit(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource.Edit', ['resource' => $request->editItem()]);
    }

    public function store(ResourceRequest $request)
    {
        $handle = $request->storeItem();

        // should deal with redirects here
        if (request()->input('postSubmitAction') == 'back') {
            return Redirect::route('invicta.resource.index', ['resource' => $handle])->with('message', [
                'type' => 'success',
                'title' => 'Saved',
            ]);
        }
    }

    public function update(ResourceRequest $request)
    {
        $handle = $request->updateItem();

        // should deal with redirects here
        if (request()->input('postSubmitAction') == 'back') {
            return Redirect::route('invicta.resource.index', ['resource' => $handle])->with('message', [
                'type' => 'success',
                'title' => 'Updated',
            ]);
        }
    }

    public function destroy(ResourceRequest $request)
    {
        // ResourceRequest $request
    }
}
