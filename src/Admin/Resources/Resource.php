<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use Eteacher\InvictaAdmin\Admin\Traits\CanEditItems;
use Eteacher\InvictaAdmin\Admin\Traits\HasFilters;
use Eteacher\InvictaAdmin\Admin\Traits\HasIndex;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class Resource extends JsonResource
{
    use HasIndex, HasFilters, CanEditItems;

    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\Page';

    /**
     * List of relationships that should be eager loaded on index.
     *
     * @var string
     */
    public $indexWith = '';

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
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $itemTitle = 'id';

    public $handle = 'base';

    public $icon = 'resource';

    public $search = [];

    protected $routePrefix = '/resource/';

    public function __construct(public $resource = null)
    {
    }

    public function route()
    {
        return Str::start($this->routePrefix.$this->handle, config('invicta.path'));
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

    public function resource()
    {
        $this->resource = $this->indexQuery();

        return $this->resource;
    }

    public function resourceModel($id)
    {
        if ($this->editWith) {
            return App::make($this->model)->where('id', $id)->with($this->editWith)->first();
        }

        return App::make($this->model)->find($id);
    }

    public function toArray($request)
    {
        if (is_null($this->resource)) {
            return [];
        }

        $indexResource = $this->indexResource($request);

        if ($indexResource) {
            return collect($indexResource)->map(function ($item, $key) {
                return is_callable($item)
                    ? $item()
                    : $item;
            });
        }

        return is_array($this->resource)
            ? $this->resource
            : $this->resource->toArray();
    }
}
