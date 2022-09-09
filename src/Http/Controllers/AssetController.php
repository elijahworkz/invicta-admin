<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Http\Request\AssetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index(AssetRequest $request)
    {
        $this->authorize('view assets');

        return Inertia::render('AssetsIndex', [
            'resource' => $request->assetList(),
            'can-create' => request()->user()->can('create assets'),
            'can-edit' => request()->user()->can('edit assets'),
            'can-delete' => request()->user()->can('delete assets'),
        ]);
    }

    public function destroy(Request $request, Asset $asset)
    {
        $this->authorize('delete assets');
        $asset->delete();

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Asset deleted',
        ]);
    }
}
