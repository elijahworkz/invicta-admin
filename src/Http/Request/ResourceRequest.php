<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;

class ResourceRequest extends InvictaRequest
{
    public function resourceClass()
    {
        $handle = $this->route('resource');

        return ResourceRegistrar::get($handle);
    }

    public function resource()
    {
        $resourceClass = $this->resourceClass();
        $resource = $resourceClass->resource();

        return $resourceClass::collection($resource)
            ->additional([
                'meta' => [
                    'filters' => request()->only('filters'),
                ],
                'columns' => $resourceClass->columns(),
                'title' => $resourceClass->title,
                'table' => $resourceClass->tableSettings(),
            ]);
    }
}
