<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\ResourceRequest;

class ResourceController extends Controller
{
    public function handleRedirectActions(ResourceRequest $request)
    {
        return $request->processAction();
    }
}
