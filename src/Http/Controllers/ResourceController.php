<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ResourceController extends Controller
{
    public function index(ResourceRequest $request)
    {
        $this->authorize('view '.$request->handle());

        $resource = $request->resourceList();

        if ($request->wantsJson()) {
            return $resource;
        }

        return Inertia::render('Invicta.Resource', [
            'resource' => $resource,
            'can-create' => $request->canCreate() && request()->user()->can('create '.$request->handle()),
            'can-edit' => request()->user()->can('edit '.$request->handle()),
            'can-delete' => request()->user()->can('delete '.$request->handle()),
        ]);
    }

    public function reorder(ResourceRequest $request)
    {
        return Inertia::render('Invicta.Resource.Reorder', ['resource' => $request->resourceOrderedList()]);
    }

    public function create(ResourceRequest $request)
    {
        $this->authorize('create '.$request->handle());

        return Inertia::render('Invicta.Resource.Create', ['resource' => $request->createItem()]);
    }

    public function show(ResourceRequest $request)
    {
        $this->authorize('view '.$request->handle());

        return Inertia::render('Invicta.Resource.Detail', ['resource' => $request->viewItem()]);
    }

    public function edit(ResourceRequest $request)
    {
        $this->authorize('edit '.$request->handle());

        return Inertia::render('Invicta.Resource.Edit', ['resource' => $request->editItem()]);
    }

    public function store(ResourceRequest $request)
    {
        $this->authorize('create '.$request->handle());

        return $this->processItem($request, 'storeItem');
    }

    public function update(ResourceRequest $request)
    {
        $this->authorize('edit '.$request->handle());

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
        [$itemId, $handle] = $request->$action();
        $postSubmitAction = request()->input('postSubmitAction');

        $message = [
            'type' => 'success',
            'title' => $action == 'storeItem' ? 'Saved' : 'Updated',
        ];

        // should deal with redirects here
        if ($postSubmitAction == 'back') {
            return Redirect::route('invicta.resource.index', ['resource' => $handle])->with('message', $message);
        } else {
            $back = ($action == 'updateItem' && $postSubmitAction == 'edit') ||
                ($action == 'storeItem' && $postSubmitAction == 'create');
            /*
                1. we are editing and select 'edit' - return back
                2. we are editing and selecte 'create' => return to create view
                3. we are creating and select 'create' => return back
                4. we are creating and select 'edit' => return to edit view
            */
            if ($back) {
                return Redirect::back()->with('message', $message);
            }

            if ($action == 'storeItem' && $postSubmitAction == 'edit') {
                return Redirect::route('invicta.resource.edit', ['resource' => $handle, 'item' => $itemId])->with('message', $message);
            }

            if ($action == 'updateItem' && $postSubmitAction == 'create') {
                return Redirect::route('invicta.resource.create', ['resource' => $handle])->with('message', $message);
            }
        }
    }

    public function destroy(ResourceRequest $request)
    {
        $this->authorize('delete '.$request->handle());

        // ResourceRequest $request
        $resource = $request->resourceClass();
        $resource->model()->whereIn('id', request()->selected)->delete();

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Selected '.$resource->handle().' deleted',
        ]);
    }
}
