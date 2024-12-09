<?php

namespace Elijahworkz\InvictaAdmin\Http\Controllers\Api;

use Elijahworkz\InvictaAdmin\Admin\Models\Navigation;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Events\NavigationUpdated;
use Elijahworkz\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
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

        $navResource = ResourceRegistrar::get('navigation');
        $tree = $menu->tree ?? [];

        return [
            'actionUrl' => route('invicta.api.nav.updateItems', ['menu' => $menu->id]),
            'menuTitle' => $menu->title,
            'localizations' => $navResource->localizable() ? $navResource->localesForEdit($menu) : null,
            'locale' => $menu->locale,
            'tree' => isset($tree['branches']) ? $tree['branches'] : $tree,
            'resources' => $resources,
        ];
    }

    public function updateItems(Request $request, Navigation $menu)
    {
        $menu->tree = ['error' => false, 'branches' => $request->tree];
        $menu->save();

        NavigationUpdated::dispatch($menu->handle);

        return response()->json(['message' => [
            'type' => 'success',
            'title' => 'Navigation updated',
        ]]);
    }

    public function localize(Navigation $menu, $locale)
    {
        $copy = $menu->replicate([
            'tree',
        ])->fill([
            'handle' => $menu->handle,
            'title' => $menu->title.'-'.$locale,
            'origin_id' => $menu->id,
            'locale' => $locale,
        ]);
        $copy->save();

        return $copy->id;
    }
}
