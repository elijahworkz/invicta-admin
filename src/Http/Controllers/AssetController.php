<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Models\Asset;
use Eteacher\InvictaAdmin\Http\Request\AssetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index(AssetRequest $request)
    {
        $this->authorize('view assets');

        return Inertia::render('Assets/Index', [
            'resource' => $request->assetList(),
            'multiUpload' => config('invicta.assets_multi_upload'),
            'can-create' => request()->user()->can('create assets'),
            'can-edit' => request()->user()->can('edit assets'),
            'can-delete' => request()->user()->can('delete assets'),
        ]);
    }

    public function destroy(Request $request)
    {
        $this->authorize('delete assets');

        Asset::whereIn('id', $request->selected)->delete();

        $name = count($request->selected) > 1 ? 'assets' : 'asset';

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Selected '.$name.' deleted',
        ]);
    }
}
