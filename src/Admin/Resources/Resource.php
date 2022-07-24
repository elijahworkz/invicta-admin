<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use Eteacher\InvictaAdmin\Admin\Traits\HasFilters;
use Eteacher\InvictaAdmin\Admin\Traits\HasIndex;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class Resource extends JsonResource
{
    use HasIndex, HasFilters;

    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\Page';

    public $eagerLoad = '';

    public $title = 'Resource';

    public $slug = 'base';

    public $icon = 'resource';

    public $search = [];

    protected $indexResource;

    private $routePrefix = '/resource/';

    public function __construct(public $resource = null)
    {
    }

    public function route()
    {
        return $this->routePrefix.$this->slug;
    }

    public function icon()
    {
        return $this->icon;
    }

    public function badge()
    {
        return null;
    }

    public function resource()
    {
        $this->resource = $this->indexQuery();

        return $this->resource;
    }

    public function resourceItem($item)
    {
        return App::make($this->model)->find($item);
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
