<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;

class ResourceController extends Controller
{
    public function index(ResourceRequest $request)
    {
        return $request->resource();
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
        return collect($request->resourceClass()->actions())->filter(function ($action) {
            return ! $action->inline;
        })->values();
    }

    public function related(ResourceRequest $request)
    {
        return $request->resourceRelated();
    }

    public function items(ResourceRequest $request)
    {
        return $request->resourceItems();
    }

    public function handleActions(ResourceRequest $request)
    {
        return response()->json($request->processAction());
    }

    public function uri(ResourceRequest $request)
    {
        return $request->itemUri();
    }
}
