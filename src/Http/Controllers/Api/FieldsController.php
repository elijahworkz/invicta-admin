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

        $result = [
            [
                'value' => null,
                'label' => 'None',
            ],
        ];

        foreach ($resources as $resource) {
            if (method_exists($resource, 'navTitle')) {
                $items = $resource->model()->select('id', $resource->titleField)->get();

                foreach ($items as $item) {
                    $result[] = [
                        'value' => $resource->handle().'::'.$item->id,
                        'label' => Str::ucfirst($resource->handle()).' | '.$item[$resource->titleField],
                    ];
                }
            }
        }

        return $result;
    }
}
