<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Models\Navigation;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Events\NavigationUpdated;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Eteacher\InvictaAdmin\Http\Resources\NavResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class NavigationController extends Controller
{
    public function index(Request $request)
    {
        return [
            'title' => 'Navigation',
            'navs' => NavResource::collection(Navigation::all()),
            'editUrl' => route('invicta.api.nav.index'),
            'can-create' => $request->user()->can('create new navigation'),
            'can-edit' => $request->user()->can('edit navigation'),
            'can-delete' => $request->user()->can('delete navigation'),
        ];
    }

    public function create()
    {
        return [
            'resource' => [
                'meta' => [
                    'title' => 'Create New Navigation',
                    'actionUrl' => route('invicta.api.nav.index'),
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
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate($request->validation);

        Navigation::create($validated);

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

    public function edit(Request $request, Navigation $menu)
    {
        return [
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
        ];
    }

    public function update(Request $request, Navigation $menu)
    {
        $validated = $request->validate($request->validation);

        $menu->update($validated);

        $message = [
            'type' => 'success',
            'title' => 'Navigation updated',
        ];

        // should deal with redirects here
        if ($request->input('postSubmitAction') == 'back') {
            return Redirect::route('invicta.nav.index')->with('message', $message);
        } else {
            return Redirect::back()->with('message', $message);
        }
    }

    public function destroy(Request $request, Navigation $menu)
    {
        $this->authorize('delete navigation');
        $menu->delete();
    }

    public function editItems(Navigation $menu)
    {
        // get all Resources that can be used in navigation
        $resources = collect(ResourceRegistrar::all())->filter(function ($resource) {
            return property_exists($resource, 'availableForNavigation');
        })->map(function ($resource) {
            return [
                'title' => $resource->navTitle(),
                'titleField' => $resource->titleField,
            ];
        });

        $tree = $menu->tree ?? [];

        return [
            'actionUrl' => route('invicta.api.nav.updateItems', ['menu' => $menu->id]),
            'menuTitle' => $menu->title,
            'tree' => isset($tree['branches']) ? $tree['branches'] : $tree,
            'resources' => $resources,
        ];
    }

    public function updateItems(Request $request, Navigation $menu)
    {
        $menu->tree = ['error' => false, 'branches' => $request->tree];
        $menu->save();

        NavigationUpdated::dispatch($menu->handle);

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Navigation updated',
        ]);
    }
}
