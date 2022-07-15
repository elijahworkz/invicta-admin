<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function filters(ResourceRequest $request)
    {
        // we need to grab resource class
        return $request->resourceClass()->title;
    }

    public function actions(Request $request, $resource)
    {
        // code...
    }
}
