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

    public function reorder(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource.Reorder', ['resource' => $request->resourceOrderedList()]);
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
        return $this->processItem($request, 'storeItem');
    }

    public function update(ResourceRequest $request)
    {
        return $this->processItem($request, 'updateItem');
    }

    public function reorderUpdate(ResourceRequest $request)
    {
        $handle = $request->updateResourceOrder();

        return Redirect::route('invicta.resource.index', ['resource' => $handle])->with('message', [
            'type' => 'success',
            'title' => 'Order Updated',
        ]);
    }

    protected function processItem($request, $action)
    {
        $handle = $request->$action();

        $message = [
            'type' => 'success',
            'title' => $action == 'storeItem' ? 'Saved' : 'Updated',
        ];

        // should deal with redirects here
        if (request()->input('postSubmitAction') == 'back') {
            return Redirect::route('invicta.resource.index', ['resource' => $handle])->with('message', $message);
        } else {
            return Redirect::back()->with('message', $message);
        }
    }

    public function destroy(ResourceRequest $request)
    {
        // ResourceRequest $request
    }
}
