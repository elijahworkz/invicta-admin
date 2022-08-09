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

    public function resourceList()
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
                'handle' => $resourceClass->handle(),
            ]);
    }

    public function createNew()
    {
        $resourceClass = $this->resourceClass();

        return [
            'meta' => [
                'handle' => $resourceClass->handle(),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'title_field' => $resourceClass->itemTitle,
            ],
            'blueprint' => $resourceClass->getBlueprint(),
        ];
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
                'handle' => $resourceClass->handle(),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'title_field' => $resourceClass->itemTitle,
            ],
            'blueprint' => $resourceClass->getBlueprint(),
        ];
    }

    public function resourceRelated()
    {
        return $this->resourceClass()->relatedQuery($this->route('related'));
    }

    public function validate()
    {
        $resourceClass = $this->resourceClass();
        $item = $this->resourceModel($resourceClass);
        $canMassUpdate = count($item->getFillable());

        $validated = request()->validate($resourceClass->validationRules());

        foreach ($validated as $field => $value) {

            // check if relationship
            if (method_exists($item, $field)) {
                // deal with relationship updates
                $resourceClass->updateRelationship($item, $field, $value);
                unset($validated[$field]);
            }

            if (! $canMassUpdate) {
                $item[$field] = $value;
            }
        }

        if (! $canMassUpdate) {
            $item->save();
        } else {
            $item->update($validated);
        }
    }
}
