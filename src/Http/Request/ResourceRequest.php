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

    protected function resourceModel($resourceClass = null)
    {
        $resourceClass = $resourceClass ? $resourceClass : $this->resourceClass();
        $itemId = $this->route('item');

        return $resourceClass->resourceModel($itemId);
    }

    public function resource()
    {
        $resourceClass = $this->resourceClass();
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
                'slug' => $resourceClass->slug,
            ]);
    }

    public function resourceItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $this->resourceModel($resourceClass);
        // return new $resourceClass($resourceClass->resourceItem($item));
        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'slug' => $resourceClass->slug,
                'title_field' => $resourceClass->itemTitle,
            ],
            'blueprint' => $resourceClass->getBlueprint(),
        ];
    }

    public function resourceRelated()
    {
        $resourceClass = $this->resourceClass();
        $relationship = $this->route('related');

        return $resourceClass->relatedQuery($relationship);
    }
}
