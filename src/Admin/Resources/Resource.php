<?php

namespace Elijahworkz\InvictaAdmin\Admin\Resources;

use Elijahworkz\InvictaAdmin\Admin\Models\Actions\EditDataRaw;
use Elijahworkz\InvictaAdmin\Admin\Models\Actions\ImportResourceItem;
use Elijahworkz\InvictaAdmin\Admin\Traits\CanEditItems;
use Elijahworkz\InvictaAdmin\Admin\Traits\HasActions;
use Elijahworkz\InvictaAdmin\Admin\Traits\HasFilters;
use Elijahworkz\InvictaAdmin\Admin\Traits\ListsItems;
use Elijahworkz\InvictaAdmin\Admin\Traits\UpdatesRelationships;
use Elijahworkz\InvictaAdmin\Facades\Permission;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class Resource extends JsonResource
{
    use CanEditItems, HasActions, HasFilters, ListsItems, UpdatesRelationships;

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

    /**
     * Determines if new resource items can be created. Shows or hides a 'Create' button.
     *
     * @var bool
     */
    public $canCreate = true;

    /**
     * Svg icon name that will be used in menu for the resource.
     *
     * @var string
     */
    public $icon = 'resource';

    /**
     * Array of column names that will searched against.
     *
     * @var array
     */
    public $search = [];

    protected $routePrefix = '/resource/';

    public function __construct(public $resource = null) {}

    public function handle()
    {
        return $this->model()->getTable();
    }

    public function route()
    {
        return $this->routePrefix.$this->handle();
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
            : Str::of($this->model)->classBasename()->snake(' ')->ucfirst()->plural();
    }

    public function createTitle()
    {
        return Str::of($this->model)->classBasename()->snake(' ')->prepend('New ');
    }

    public function viewTitle($item)
    {
        $pageTitle = $this->titleField == 'id' ? Str::singular($this->menuTitle()).' '.$item[$this->titleField] : $item[$this->titleField];

        if (! $pageTitle && count($titleRelated = explode('.', $this->titleField)) > 1) {
            $related = $titleRelated[0];
            $relatedModel = $item->$related;
            $pageTitle = $relatedModel ? $relatedModel[$titleRelated[1]] : $pageTitle;
        }

        return $pageTitle;
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

    public function setPermissions()
    {
        Permission::setPermissions($this->handle(), $this->permissions());
    }

    public function localizable()
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
     * @return array instance of Elijahworkz\InvictaAdmin\Admin\Permissions\Permission
     */
    public function permissions()
    {
        return [];
    }

    public function globalActions()
    {
        return [
            // new ImportResourceItem,
            // new EditDataRaw,
        ];
    }
}
