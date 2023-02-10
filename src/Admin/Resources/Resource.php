<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use Eteacher\InvictaAdmin\Admin\Models\Actions\EditDataRaw;
use Eteacher\InvictaAdmin\Admin\Models\Actions\ImportResourceItem;
use Eteacher\InvictaAdmin\Admin\Traits\CanEditItems;
use Eteacher\InvictaAdmin\Admin\Traits\HasActions;
use Eteacher\InvictaAdmin\Admin\Traits\HasFilters;
use Eteacher\InvictaAdmin\Admin\Traits\ListsItems;
use Eteacher\InvictaAdmin\Admin\Traits\UpdatesRelationships;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Resource extends JsonResource
{
    use ListsItems, HasFilters, HasActions, CanEditItems, UpdatesRelationships;

    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\Page';

    /**
     * List of relationships that should be eager loaded on index.
     *
     * @var string
     */
    public $indexWith;

    public $canCreate = true;

    /**
     * List of relationships that should be eager loaded on edit.
     *
     * @var string
     */
    public $editWith;

    /**
     * The name that should be used in the menu.
     *
     * @var string
     */
    public $menuTitle = null;

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'id';

    public $icon = 'resource';

    public $search = [];

    protected $routePrefix = '/resource/';

    public function __construct(public $resource = null)
    {
    }

    public function handle()
    {
        return $this->model()->getTable();
    }

    public function route()
    {
        return Str::start($this->routePrefix.$this->handle(), config('invicta.path'));
    }

    public function icon()
    {
        return $this->icon;
    }

    public function badge()
    {
        return null;
    }

    public function menuTitle()
    {
        return $this->menuTitle
            ? $this->menuTitle
            : Str::of($this->model)->classBasename()->plural();
    }

    public function createTitle()
    {
        return Str::of($this->model)->classBasename()->prepend('New ');
    }

    public function resource()
    {
        return $this->indexQuery();
    }

    public function findModel($id, $with = true)
    {
        if ($with && $this->editWith) {
            return $this->model()->where('id', $id)->with($this->editWith)->first();
        }

        return $this->model()->find($id);
    }

    public function model()
    {
        return App::make($this->model);
    }

    public function sortable()
    {
        return method_exists($this->model(), 'orderColumnName');
    }

    public function localizible()
    {
        return method_exists($this, 'locales');
    }

    public function toArray($request)
    {
        if (is_null($this->resource)) {
            return [];
        }

        $indexResource = $this->indexResource($request);

        if ($indexResource) {
            return collect($indexResource)
                ->put('actions', $this->resourceActions($request->user(), $this->resource));
        }

        $resourceArray = is_array($this->resource)
            ? $this->resource
            : $this->resource->toArray();

        $resourceArray['actions'] = $this->resourceActions($request->user(), $this->resource);

        return $resourceArray;
    }

    /**
     *  set additional permission for current resource.
     *
     * @return array instance of Eteacher\InvictaAdmin\Admin\Permissions\Permission
     */
    public function permissions()
    {
        return [];
    }

    public function updateResourceAsset($item, $fieldPath, $name = null)
    {
        $assetsPath = config('invicta.assets_path');
        $root = Str::before($fieldPath, '.');
        $last = Str::after($fieldPath, '.');

        $fieldData = $item[$root];
        $asset = Arr::get($fieldData, $last);

        if ($asset) {
            $extension = Str::afterLast($asset['name'], '.');

            $assetName = $name
                ? $name.'.'.$extension
                : $item->id.'.'.$extension;

            $assetPath = Str::of($assetsPath)
                ->finish('/')
                ->append($this->handle().'/')
                ->append($assetName);

            if ($asset['path'] != $assetPath) {
                Storage::move($asset['path'], $assetPath);

                $asset['name'] = $assetName;
                $asset['path'] = $assetPath;
                $asset['src'] = _asset($assetPath);

                Arr::set($fieldData, $last, $asset);

                $item[$root] = $fieldData;
                $item->save();
            }
        }

        return $item;
    }

    public function globalActions()
    {
        return [
            // new ImportResourceItem,
            // new EditDataRaw,
        ];
    }
}
