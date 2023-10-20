<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Events\ResourceDeleted;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;

class ResourceController extends Controller
{
    public function index(ResourceRequest $request)
    {
        if ($request->has('selectAll')) {
            return $request->selectAllRequest();
        }

        return $request->resourceList($request->has('settings'));
    }

    public function create(ResourceRequest $request)
    {
        return $request->createItem();
    }

    public function edit(ResourceRequest $request)
    {
        return $request->editItem();
    }

    public function filters(ResourceRequest $request)
    {
        return $request->resourceClass()->filters();
    }

    public function actions(ResourceRequest $request)
    {
        return collect($request->resourceClass()->allActions())->filter(function ($action) {
            return ! $action->inline();
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

    public function related(ResourceRequest $request)
    {
        return $request->resourceRelated();
    }

    public function items(ResourceRequest $request)
    {
        return $request->resourceItems();
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
