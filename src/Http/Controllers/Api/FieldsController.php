<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class FieldsController extends Controller
{
    public function linkableResources(Request $request)
    {
        $resources = ResourceRegistrar::all();

        $result = [];

        foreach ($resources as $resource) {
            if (method_exists($resource, 'navTitle')) {
                $result[] = [
                    'handle' => $resource->handle(),
                    'label' => $resource->menuTitle(),
                    'titleField' => $resource->titleField,
                ];
            }
        }

        return $result;
    }

    public function filterOptions(Request $request)
    {
        return App::make($request->handle)::remoteOptions($request->search);
    }

    public function linkableResourcesOptions(Request $request)
    {
        $resources = ResourceRegistrar::all();
        $resourcesToList = $request->has('resources')
            ? (is_array($request->resources) ? $request->resources : [$request->resources])
            : null;

        $result = [];

        foreach ($resources as $resource) {
            // First we check for all linkable resources - ie those that have AvailableForNavigation Trait
            if (method_exists($resource, 'navTitle')) {
                $handle = $resource->handle();

                if ($resourcesToList && ! in_array($handle, $resourcesToList)) {
                    continue;
                }

                $items = $resource->model()->select('id', $resource->titleField)->get();

                $options = [];

                foreach ($items as $item) {
                    $options[] = [
                        'value' => $resource->handle().'::'.$item->id,
                        'label' => $item[$resource->titleField],
                    ];
                }

                $result[] = [
                    'label' => Str::ucfirst($resource->handle()),
                    'options' => $options,
                ];
            }
        }

        return $result;
    }
}
