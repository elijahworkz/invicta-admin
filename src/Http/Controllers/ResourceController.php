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
        $handle = $request->resourceUpdate();

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
