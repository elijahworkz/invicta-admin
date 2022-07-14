<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;

class ResourceRequest extends InvictaRequest
{
    public function resource()
    {
        $handle = $this->route('resource');
        $resourceClass = ResourceRegistrar::get($handle);
        $resource = $resourceClass->resource();

        return $resourceClass::collection($resource)
            ->additional([
                'meta' => [
                    'filters' => request()->only(['search', 'page', 'per_page', 'sort_order', 'filters']),
                ],
                'columns' => $resourceClass->columns(),
            ]);
    }
}
