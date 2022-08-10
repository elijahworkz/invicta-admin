<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function index(ResourceRequest $request)
    {
        return $request->resource();
    }

    public function create(ResourceRequest $request)
    {
        return $request->createNew();
    }

    public function edit(ResourceRequest $request)
    {
        return $request->resourceItem();
    }

    public function filters(ResourceRequest $request)
    {
        // we need to grab resource class
        return response()->json($request->resourceClass()->filters());
    }

    public function actions(Request $request, $resource)
    {
        // code...
    }

    public function related(ResourceRequest $request)
    {
        return $request->resourceRelated();
    }

    public function items(ResourceRequest $request)
    {
        return $request->resourceItems();
    }
}
