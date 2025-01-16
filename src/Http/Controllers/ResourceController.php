<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers;

use Elijahworkz\InvictaAdmin\Http\Request\ResourceRequest;

class ResourceController extends Controller
{
    public function handleRedirectActions(ResourceRequest $request)
    {
        return $request->processAction();
    }
}
