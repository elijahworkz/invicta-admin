<?php

namespace Elijahworkz\InvictaAdmin\Http\Request;

use Elijahworkz\InvictaAdmin\Admin\Actions\ActionJob;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Events\ResourceUpdated;
use Elijahworkz\InvictaAdmin\Facades\Blueprint;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Fluent;
use Illuminate\Support\Str;

class ResourceRequest extends FormRequest
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

    public function resourceList($settings = false)
    {
        $resourceClass = $this->resourceClass();
        $resource = $resourceClass->resource();
        $handle = $resourceClass->handle();

        $meta = [
            ...request()->only('search', 'filters'),
            'filterBadges' => $resourceClass->filterBadges(),
        ];

        if ($settings) {
            $user = request()->user();
            $meta['settings'] = [
                'handle' => $handle, // we need this sometimes for form requests i.e. tableField
                'title' => $resourceClass->menuTitle(),
                'table' => $resourceClass->indexTableSettings(),
                'columns' => $resourceClass->indexColumns(),
                'sortable' => $resourceClass->sortable(),
                'locales' => $resourceClass->localizable() ? $resourceClass->locales() : null,
                'indexEdit' => $resourceClass->indexEdit,
                'hasDetail' => method_exists($resourceClass, 'showDetail'),
                'canCreate' => $resourceClass->canCreate && $user->can("create $handle"),
                'canEdit' => $user->can("edit $handle") || $user->can("edit $handle items"),
                'canDelete' => $user->can("delete $handle"),
            ];
        }

        return $resourceClass::collection($resource)
            ->additional([
                'meta' => $meta,
            ]);
    }

    public function selectAllRequest()
    {
        $resourceClass = $this->resourceClass();

        return $resourceClass->selectAll();
    }

    // Return data for create view
    public function createItem()
    {
        $resourceClass = $this->resourceClass();
        $handle = $resourceClass->handle();

        $response = [
            'meta' => [
                'handle' => $handle,
                'actionUrl' => route('invicta.api.resource.store', ['resource' => $handle]),
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

    // Returns data for detail view
    public function viewItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $handle = $resourceClass->handle();

        return ['resourceItem' => [
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
        ]];
    }

    // returns data for edit view
    public function editItem()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $handle = $resourceClass->handle();
        $localizable = $resourceClass->localizable();

        if (request()->has('blueprint')) {
            $item->blueprint = request()->blueprint;
        }

        if ($localizable && $item->locale !== App::currentLocale()) {
            App::setLocale($item->locale);
            Session::put('locale', $item->locale);
        }

        return [
            'item' => $item,
            'meta' => [
                'id' => $item->id,
                'handle' => $handle,
                'actionUrl' => route('invicta.api.resource.update', ['resource' => $handle, 'item' => $item->id]),
                'indexUrl' => $resourceClass->route(),
                'indexTitle' => $resourceClass->menuTitle(),
                'titleField' => $resourceClass->titleField,
                'pageTitle' => $resourceClass->viewTitle($item),
                'itemUrl' => (! empty($item->uri)) ? url($item->uri) : null,
            ],
            'localizations' => $localizable ? $resourceClass->localesForEdit($item) : null,
            'blueprint' => request()->has('blueprint')
                ? Blueprint::findByHandle($resourceClass, request()->blueprint)
                : Blueprint::getDefault($resourceClass, $item),
        ];
    }

    public function itemUri()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));

        if (is_null($item)) {
            return null;
        }

        if (isset($item['uri'])) {
            return $item->uri;
        }

        if (method_exists($resourceClass, 'uri')) {
            return $resourceClass->uri($item);
        }

        return '';
    }

    public function relatedResource()
    {
        return $this->resourceClass()->relatedQuery($this->route('related'));
    }

    public function relatedItems()
    {
        $resourceClass = $this->resourceClass();
        $item = $resourceClass->findModel($this->route('item'));
        $related = $this->route('related');

        return $item->$related()->get();
    }

    public function resourceItems()
    {
        return $this->resourceClass()->itemsQuery();
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

        $fields = request()->has('fields') ? request()->fields : [];
        if ($fields) {
            Validator::make($fields, request()->validation)
                ->validate();
        }

        $fields = new Fluent($fields);
        $user = request()->user();

        if ($action->shouldQueue) {
            ActionJob::dispatch($action, $models, $fields, $user);

            return $action->message();
        }

        $response = $action->handle($fields, $models, $user);

        if (request()->method() == 'GET') {
            return $response;
        } else {
            return $action->message();
        }
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

        App::setLocale($locale);
        Session::put('locale', $locale);

        $copy = $item->replicate()->fill([
            'uri' => Str::of($item->uri)->start('/'.$locale),
            'origin_id' => $item->id,
            'locale' => $locale,
        ]);
        $copy->save();

        return $copy->id;
    }

    protected function processItem($resourceClass, $item, $action)
    {
        $validated = Validator::make(request()->fields, request()->validation)->validate();

        $actionMethod = "{$action}Item";
        if ($resourceClass->$actionMethod($validated, $item)) {
            return;
        }

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

            $item[$field] = $value;
        }

        $item = $resourceClass->beforeSave($item, $action);

        $item->save();

        foreach ($relatedFields as $field => $value) {
            $resourceClass->updateRelationship($item, $field, $value);
        }

        $resourceClass->afterSave($item, $action);

        ResourceUpdated::dispatch($resourceClass->handle(), $item);

        return $item->id;
    }
}
