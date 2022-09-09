<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Models\Resources\Asset;

class AssetRequest extends InvictaRequest
{
    public function assetList()
    {
        $resourceClass = new Asset;
        $resource = $resourceClass->resource();

        return $resourceClass::collection($resource)
            ->additional([
                'title' => $resourceClass->menuTitle(),
                'meta' => [
                    ...request()->only('search', 'filters'),
                    'filterBadges' => $resourceClass->filterBadges(),
                ],
                'columns' => $resourceClass->indexColumns(),
                'table' => $resourceClass->indexTableSettings(),
                'handle' => $resourceClass->handle(),
                'sortable' => $resourceClass->sortable(),
            ]);
    }
}
