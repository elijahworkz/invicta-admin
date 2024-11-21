<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Api;

use Elijahworkz\InvictaAdmin\Events\ResourceDeleted;
use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
use Elijahworkz\InvictaAdmin\Http\Request\ResourceRequest;

class ResourceController extends Controller
{
    // Index Page
    public function index(ResourceRequest $request)
    {
        if ($request->has('selectAll')) {
            return $request->selectAllRequest();
        }

        return $request->resourceList($request->has('settings'));
    }

    // Create Page
    public function create(ResourceRequest $request)
    {
        return $request->createItem();
    }

    // Edit Page
    public function edit(ResourceRequest $request)
    {
        return $request->editItem();
    }

    // Detail Page
    public function show(ResourceRequest $request)
    {

        return $request->viewItem();
    }

    public function store(ResourceRequest $request)
    {
        // $this->authorize('create '.$request->handle());
        return $this->processItem($request, 'storeItem');
    }

    public function update(ResourceRequest $request)
    {
        // Gate::any(['edit '.$request->handle(), 'edit '.$request->handle().' items']);

        return $this->processItem($request, 'updateItem');
    }

    protected function processItem($request, $action)
    {
        [$itemId, $handle] = $request->$action();

        return response()->json([
            'message' => [
                'type' => 'success',
                'title' => $action == 'storeItem' ? 'Saved' : 'Updated',
            ],
            'item' => $itemId,
        ]);
    }

    // Available filters for resource
    public function filters(ResourceRequest $request)
    {
        return $request->resourceClass()->filters();
    }

    // Available actions for resource
    public function actions(ResourceRequest $request)
    {
        $handle = $request->handle();

        return collect($request->resourceClass()->allActions())
            ->filter(function ($action) use ($handle) {
                if (! $action->inline()) {
                    if ($action->redirect) {
                        $action->setRedirect($handle);
                    }

                    return true;
                }

                return false;
            })->values();
    }

    public function actionBlueprint(ResourceRequest $request)
    {
        return $request->actionBlueprint();
    }

    public function handleActions(ResourceRequest $request)
    {
        return response()->json($request->processAction());
    }

    public function relationship(ResourceRequest $request)
    {
        return $request->relatedResource();
    }

    public function items(ResourceRequest $request)
    {
        return $request->resourceItems();
    }

    public function related(ResourceRequest $request)
    {
        return $request->relatedItems();
    }

    public function uri(ResourceRequest $request)
    {
        return $request->itemUri();
    }

    public function localize(ResourceRequest $request)
    {
        return $request->localizeItem();
    }

    public function destroy(ResourceRequest $request)
    {
        $this->authorize('delete '.$request->handle());

        // ResourceRequest $request
        $resource = $request->resourceClass();

        ResourceDeleted::dispatch($resource->handle(), $resource);

        $resource->model()->whereIn('id', request()->selected)->delete();

        return response()->json([
            'message' => [
                'type' => 'success',
                'title' => 'Selected '.$resource->handle().' deleted',
            ],
        ]);
    }
}
