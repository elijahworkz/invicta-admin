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

        return $resourceClass->resourceModel($this->route('item'));
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
        $handle = $resourceClass->handle();

        return [
            'meta' => [
                'handle' => $handle,
                'actionUrl' => route('invicta.resource.store', ['resource' => $handle]),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'createTitle' => $resourceClass->createTitle(),
                'title_field' => $resourceClass->itemTitle,
            ],
            'blueprint' => $resourceClass->getBlueprint(),
        ];
    }

    public function resourceItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->resourceModel($this->route('item'));
        $handle = $resourceClass->handle();

        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'handle' => $handle,
                'actionUrl' => route('invicta.resource.update', ['resource' => $handle, 'item' => $item->id]),
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

    public function resourceItems()
    {
        return $this->resourceClass()->itemsQuery();
    }

    public function resourceUpdate()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->resourceModel($this->route('item'), false);
        $canMassUpdate = count($item->getFillable());

        $validated = request()->validate($resourceClass->validationRules());

        foreach ($validated as $field => $value) {

            // check if relationship
            if (method_exists($item, $field)) {
                $resourceClass->updateRelationship($item, $field, $value);
                unset($validated[$field]);
            } elseif (! $canMassUpdate) {
                $item[$field] = $value;
            }
        }

        if (! $canMassUpdate) {
            $item->save();
        } else {
            $item->update($validated);
        }

        return $resourceClass->handle();
    }
}
