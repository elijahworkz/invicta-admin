<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\AssetRequest;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index(AssetRequest $request)
    {
        $this->authorize('view assets');

        return Inertia::render('Assets/Index', $request->assetList());
    }
}
