<?php

namespace Eteacher\InvictaAdmin\Http\Controllers\Api;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}
