<?php

namespace Eteacher\InvictaAdmin\Http\Request;

use Eteacher\InvictaAdmin\Admin\Actions\ActionJob;
use Eteacher\InvictaAdmin\Admin\Models\Asset;
use Eteacher\InvictaAdmin\Admin\Models\Resources\Asset as AssetResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Fluent;

class AssetRequest extends InvictaRequest
{
    public function resourceClass()
    {
        return new AssetResource;
    }

    public function assetList($api = false)
    {
        $resourceClass = $this->resourceClass();
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
        $action = App::make(request()->class);

        if (request()->has('asset')) {
            return [
                'message' => [
                    'type' => 'success',
                    'title' => 'Action Run successfully',
                ],
                'asset' => $action->run(request()->asset),
            ];
        }

        $models = request()->has('selected')
            ? Asset::whereIn('id', request()->selected)->get()
            : null;

        $fields = request()->has('fields') ? request()->fields : [];

        if ($fields) {
            Validator::make($fields, request()->validation)
                ->validate();
        }

        $fields = new Fluent($fields);
        $user = request()->user();

        if ($action->shouldQueue) {
            ActionJob::dispatch($action, $models, $fields, $user);

            return ['message' => [
                'type' => 'success',
                'title' => 'Action was added to the queue',
            ]];
        }

        $response = $action->handle($fields, $models, $user);

        if (request()->method() == 'GET') {
            return $response;
        } else {
            return ['message' => [
                'type' => 'success',
                'title' => 'Action Run successfully',
            ]];
        }
    }
}
