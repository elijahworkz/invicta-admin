<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Actions\ActionJob;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Fluent;

class ResourceRequest extends InvictaRequest
{
    public function resourceClass()
    {
        $handle = $this->route('resource');

        return ResourceRegistrar::get($handle);
    }

    public function handle()
    {
        return $this->route('resource');
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
                'sortable' => $resourceClass->sortable(),
            ]);
    }

    public function resourceOrderedList()
    {
        $resourceClass = $this->resourceClass();
        $resource = $resourceClass->resourceOrdered();

        $columns = collect($resourceClass->indexColumns())
            ->filter(function ($item) {
                return ! $item->hidden;
            })
            ->all();

        return [
            'data' => $resource,
            'title' => $resourceClass->menuTitle(),
            'columns' => $columns,
            'indexUrl' => $resourceClass->route(),
            'handle' => $resourceClass->handle(),
        ];
    }

    public function createItem()
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
                'titleField' => $resourceClass->titleField,
            ],
            'blueprint' => $resourceClass->getBlueprint(),
        ];
    }

    public function editItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $handle = $resourceClass->handle();

        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'handle' => $handle,
                'actionUrl' => route('invicta.resource.update', ['resource' => $handle, 'item' => $item->id]),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'title_field' => $resourceClass->titleField,
            ],
            'blueprint' => $resourceClass->getBlueprint($item),
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

    public function updateResourceOrder()
    {
        $resourceClass = $this->resourceClass();
        $model = $resourceClass->model();
        $orderColumn = $model::orderColumnName();
        $handle = $resourceClass->handle();

        $ids = $cases = [];

        foreach (request()->order as $item) {
            $ids[] = $item['id'];
            $cases[] = "WHEN {$item['id']} THEN {$item['order']}";
        }

        $cases = implode(' ', $cases);
        $ids = implode(',', $ids);

        $sql = "UPDATE {$handle} SET `{$orderColumn}` = CASE `id` {$cases} END WHERE `id` in ({$ids})";

        DB::update($sql);

        return $handle;
    }

    public function processAction()
    {
        $resource = $this->resourceClass();
        $models = $resource->model()->whereIn('id', request()->selected)->get();
        $action = App::make(request()->class);
        $fields = new Fluent(request()->fields);

        if ($action->shouldQueue) {
            ActionJob::dispatch($action, $models, $fields);

            return ['message' => [
                'type' => 'success',
                'title' => 'Action was added to the queue',
            ]];
        }

        $action->handle($fields, $models);

        return ['message' => [
            'type' => 'success',
            'title' => 'Action Run successfully',
        ]];
    }

    public function storeItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->model();

        $this->processItem($resourceClass, $item, 'create');

        return $resourceClass->handle();
    }

    public function updateItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'), false);

        $this->processItem($resourceClass, $item, 'update');

        return $resourceClass->handle();
    }

    protected function processItem($resourceClass, $item, $action)
    {
        $massAssign = count($item->getFillable());
        $validated = request()->validate(request()->validation);

        $relatedFields = [];

        foreach ($validated as $field => $value) {
            // first we check if it's a mutator
            if (! $item->hasAttributeMutator($field)) {
                // check if relationship
                if (method_exists($item, $field)) {
                    $relatedFields[$field] = $value;
                    unset($validated[$field]);
                    continue;
                }
            }
            if (! $massAssign) {
                $item[$field] = $value;
            }
        }

        if (! $massAssign) {
            $item->save();
        } else {
            $result = $item->$action($validated);
            $item = $item->id ? $item : $result;
        }

        foreach ($relatedFields as $field => $value) {
            $resourceClass->updateRelationship($item, $field, $value);
        }
    }
}
