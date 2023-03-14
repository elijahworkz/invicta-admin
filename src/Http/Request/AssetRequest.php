<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Models\Resources\Asset;

class AssetRequest extends InvictaRequest
{
    public function assetList($api = false)
    {
        $resourceClass = new Asset;
        $resource = $resourceClass->resource();

        $collection = $resourceClass::collection($resource)
            ->additional([
                'meta' => [
                    ...request()->only('search', 'filters'),
                    'filterBadges' => $resourceClass->filterBadges(),
                ],
            ]);

        if ($api) {
            return $collection;
        }

        return [
            'title' => $resourceClass->menuTitle(),
            'resource' => $collection,
            'settings' => [
                'columns' => $resourceClass->indexColumns(),
                'table' => $resourceClass->indexTableSettings(),
                'handle' => $resourceClass->handle(),
                'sortable' => $resourceClass->sortable(),
                'resourceUrl' => route('invicta.api.assets.index'),
            ],
        ];
    }
}
