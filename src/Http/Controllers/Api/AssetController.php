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

        return $request->assetList();
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

    public function edit(Request $request, Navigation $menu)
    {
        $this->authorize('create new assets');

        return Inertia::render('NavEdit', [
            'actionUrl' => invicta_route('nav.update', ['menu' => $menu->id]),
            'indexUrl' => invicta_route('nav.index'),
            'resource' => [
                'item' => $menu,
                'meta' => [
                    'titleField' => 'title',
                    'title' => $menu->title,
                ],
                'blueprint' => [
                    'fields' => [
                        [
                            'id' => 'title',
                            'type' => 'text',
                            'validation' => 'required',
                        ],
                        [
                            'id' => 'handle',
                            'type' => 'slug',
                            'source' => 'title',
                            'validation' => 'required|unique:navigation',
                        ],
                    ],
                ],
            ],
        ]);
    }

    public function update(Request $request, Navigation $menu)
    {
        $validated = $request->validate($request->validation);

        $menu->update($validated);

        $message = [
            'type' => 'success',
            'title' => 'Navigation created',
        ];

        // should deal with redirects here
        if ($request->input('postSubmitAction') == 'back') {
            return Redirect::route('invicta.nav.index')->with('message', $message);
        } else {
            return Redirect::back()->with('message', $message);
        }
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
