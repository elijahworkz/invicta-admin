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
                    'columns' => $resourceClass->indexColumns(),
                    'table' => $resourceClass->indexTableSettings(),
                ],
            ]);

        if ($api) {
            return $collection;
        }

        $user = request()->user();

        return [
            'title' => $resourceClass->menuTitle(),
            'resource' => $collection,
            'settings' => [
                'handle' => $resourceClass->handle(),
                'sortable' => $resourceClass->sortable(),
                'resourceUrl' => route('invicta.api.assets.index'),
                'multiUpload' => config('invicta.assets_multi_upload'),
                'canCreate' => $user->can('create assets'),
                'canEdit' => $user->can('edit assets'),
                'canDelete' => $user->can('delete assets'),
            ],
        ];
    }
}
