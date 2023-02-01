<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Models\Navigation;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Events\NavigationUpdated;
use Eteacher\InvictaAdmin\Http\Resources\NavResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NavigationController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('view navigation');

        return Inertia::render('Nav/Index', [
            'title' => 'Navigation',
            'navs' => NavResource::collection(Navigation::all()),
            'createUrl' => invicta_route('nav.create'),
            'editUrl' => invicta_route('nav.index'),
            'can-create' => $request->user()->can('create new navigation'),
            'can-edit' => $request->user()->can('edit navigation'),
            'can-delete' => $request->user()->can('delete navigation'),
        ]);
    }

    public function create()
    {
        $this->authorize('create new navigation');

        return Inertia::render('Nav/Edit', [
            'indexUrl' => invicta_route('nav.index'),
            'actionUrl' => invicta_route('nav.index'),
            'resource' => [
                'meta' => [
                    'createTitle' => 'Create New Navigation',
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
        $this->authorize('create new navigation');

        return Inertia::render('Nav/Edit', [
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

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Navigation deleted',
        ]);
    }

    public function editItems(Navigation $menu)
    {
        $this->authorize('edit navigation');

        // get all Resources that can be used in navigation
        $resources = collect(ResourceRegistrar::all())->filter(function ($resource) {
            return property_exists($resource, 'availableForNavigation');
        })->map(function ($resource) {
            return [
                'title' => $resource->navTitle(),
                'titleField' => $resource->titleField,
            ];
        });

        return Inertia::render('Nav/ItemsEdit', [
            'indexUrl' => invicta_route('nav.index'),
            'actionUrl' => invicta_route('nav.updateItems', ['menu' => $menu->id]),
            'menu' => $menu,
            'resources' => $resources,
        ]);
    }

    public function updateItems(Request $request, Navigation $menu)
    {
        $this->authorize('edit navigation');

        $menu->tree = $request->tree;
        $menu->save();

        NavigationUpdated::dispatch($menu->handle);

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Navigation updated',
        ]);
    }
}
