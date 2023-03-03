<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Actions\ActionJob;
use Eteacher\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Eteacher\InvictaAdmin\Events\ResourceUpdated;
use Eteacher\InvictaAdmin\Facades\Blueprint;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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

    public function canCreate()
    {
        return $this->resourceClass()->canCreate;
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
                'locales' => $resourceClass->localizible() ? $resourceClass->locales() : null,
                'indexEdit' => $resourceClass->indexEdit,
                'hasDetail' => method_exists($resourceClass, 'showDetail'),
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

        $response = [
            'meta' => [
                'handle' => $handle,
                'actionUrl' => route('invicta.resource.store', ['resource' => $handle]),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'titleField' => $resourceClass->titleField,
                'pageTitle' => $resourceClass->createTitle(),
            ],
            'blueprint' => request()->has('blueprint')
                ? Blueprint::findByHandle($resourceClass, request()->blueprint)
                : Blueprint::getDefault($resourceClass),
        ];

        if (request()->has('blueprint')) {
            $response['item'] = ['blueprint' => request()->blueprint];
        }

        return $response;
    }

    public function viewItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $handle = $resourceClass->handle();

        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'handle' => $handle,
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'titleField' => $resourceClass->titleField,
                'pageTitle' => $resourceClass->viewTitle($item),
            ],
            'blueprint' => Blueprint::detailBlueprint($resourceClass, $item),
            'header' => [
                'title' => $resourceClass->detailTitle($item),
                'info' => $resourceClass->detailInfo($item),
            ],
        ];
    }

    public function editItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $handle = $resourceClass->handle();

        if (request()->has('blueprint')) {
            $item->blueprint = request()->blueprint;
        }

        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'handle' => $handle,
                'actionUrl' => route('invicta.resource.update', ['resource' => $handle, 'item' => $item->id]),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'titleField' => $resourceClass->titleField,
                'pageTitle' => $resourceClass->viewTitle($item),
            ],
            'localizations' => $resourceClass->localizible() ? $resourceClass->localesForEdit($item) : null,
            'blueprint' => request()->has('blueprint')
                ? Blueprint::findByHandle($resourceClass, request()->blueprint)
                : Blueprint::getDefault($resourceClass, $item),
        ];
    }

    public function itemUri()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));

        if (isset($item['uri'])) {
            return $item->uri;
        }

        if (method_exists($resourceClass, 'uri')) {
            return $resourceClass->uri($item);
        }

        return '';
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

    public function actionBlueprint()
    {
        $resourceClass = $this->resourceClass();
        $item = $this->route('item')
            ? $resourceClass->findModel($this->route('item'))
            : $resourceClass->model();

        $action = App::make(request()->class);
        $handle = $resourceClass->handle();

        return [
            'meta' => [
                'actionUrl' => route('invicta.api.resource.handle-actions', ['resource' => $handle]),
                'handle' => $handle,
                'titleField' => $resourceClass->titleField,
                'pageTitle' => $action->name(),
            ],
            'blueprint' => $action->blueprint($item),
        ];
    }

    public function processAction()
    {
        $resource = $this->resourceClass();
        $models = request()->has('selected')
            ? $resource->model()->whereIn('id', request()->selected)->get()
            : null;

        $action = App::make(request()->class);

        Validator::make(request()->fields, request()->validation)
            ->validate();

        $fields = new Fluent(request()->fields);
        $user = request()->user();

        if ($action->shouldQueue) {
            ActionJob::dispatch($action, $models, $fields, $user);

            return ['message' => [
                'type' => 'success',
                'title' => 'Action was added to the queue',
            ]];
        }

        $action->handle($fields, $models, $user);

        return ['message' => [
            'type' => 'success',
            'title' => 'Action Run successfully',
        ]];
    }

    public function storeItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->model();

        $itemId = $this->processItem($resourceClass, $item, 'create');

        return [$itemId, $resourceClass->handle()];
    }

    public function updateItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'), false);

        $itemId = $this->processItem($resourceClass, $item, 'update');

        return [$itemId, $resourceClass->handle()];
    }

    public function localizeItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'), false);
        $locale = $this->route('locale');

        $copy = $item->replicate([
            'content', 'seo',
        ])->fill([
            'title' => $item->title.'-'.$locale,
            'slug' => $item->slug.'-'.$locale,
            'origin_id' => $item->id,
            'locale' => $locale,
        ]);
        $copy->save();

        return [$copy->id, $resourceClass->handle()];
    }

    protected function processItem($resourceClass, $item, $action)
    {
        $massAssign = count($item->getFillable());
        $validated = request()->validate(request()->validation);

        $actionMethod = "{$action}Item";
        if ($resourceClass->$actionMethod($validated, $item)) {
            return;
        }

        $relatedFields = [];

        // Fix for 'data' column issue
        if (isset($validated['_data'])) {
            $validated['data'] = $validated['_data'];
            unset($validated['_data']);
        }

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

        $item = $resourceClass->beforeSave($item, $action);

        if (! $massAssign) {
            $item->save();
        } else {
            $result = $item->$action($validated);
            $item = $item->id ? $item : $result;
        }

        foreach ($relatedFields as $field => $value) {
            $resourceClass->updateRelationship($item, $field, $value);
        }

        $resourceClass->afterSave($item, $action);

        ResourceUpdated::dispatch($resourceClass->handle(), $item);

        return $item->id;
    }
}
