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
}
