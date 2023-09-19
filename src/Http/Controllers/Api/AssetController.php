<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Models\Asset;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Request\AssetRequest;
use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function index(AssetRequest $request)
    {
        $this->authorize('view assets');

        return $request->assetList(true);
    }

    public function store(Request $request)
    {
        $this->authorize('create new assets');

        sleep(3);

        if ($request->hasFile('file')) {
            return Asset::saveFile($request->file('file'));
        }

        abort(413, 'File exceeds allowed size limit');
    }

    public function update(Request $request, Asset $asset)
    {
        $validated = $request->validate([
            'alt' => 'required|string|max:150',
        ]);

        $asset->update($validated);
    }

    public function actions(AssetRequest $request)
    {
        return collect($request->resourceClass()->allActions())->filter(function ($action) {
            return ! $action->inline();
        })->values();
    }

    public function actionBlueprint(AssetRequest $request)
    {
        return $request->actionBlueprint();
    }

    public function handleActions(AssetRequest $request)
    {
        return response()->json($request->processAction());
    }

    public function fieldActions(AssetRequest $request)
    {
        return $request->resourceClass()->fieldActions();
    }

    public function destroy(Request $request)
    {
        $this->authorize('delete assets');

        Asset::whereIn('id', $request->selected)->delete();

        $name = count($request->selected) > 1 ? 'assets' : 'asset';

        return response()->json([
            'message' => [
                'type' => 'success',
                'title' => 'Selected '.$name.' deleted',
            ],
        ]);
    }
}
