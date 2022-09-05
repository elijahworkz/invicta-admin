<?php

namespace Eteacher\InvictaAdmin\Http\Controllers;

use Eteacher\InvictaAdmin\Admin\Models\Navigation;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Http\Resources\NavResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NavigationController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('view navigation');

        return Inertia::render('NavIndex', [
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

        return Inertia::render('NavCreate', [
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
                            'type' => 'text',
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

    public function edit(Navigation $menu)
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

        return Inertia::render('NavEdit', [
            'indexUrl' => invicta_route('nav.index'),
            'actionUrl' => invicta_route('nav.update', ['menu' => $menu->id]),
            'menu' => $menu,
            'resources' => $resources,
        ]);
    }

    public function update(Request $request, Navigation $menu)
    {
        $this->authorize('edit navigation');

        $menu->tree = $request->tree;
        $menu->save();

        return Redirect::back()->with('message', [
            'type' => 'success',
            'title' => 'Navigation Updated',
        ]);
    }

    public function editSettings()
    {
        // code...
    }

    public function updateSettings()
    {
        // code...
    }
}
