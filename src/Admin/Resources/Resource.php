<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use Eteacher\InvictaAdmin\Admin\Traits\HasFilters;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class Resource extends JsonResource
{
    use HasFilters;

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

    public function indexQuery($value = '')
    {
        $query = App::make($this->model)->query();
        $perPage = request()->query('per_page', 10);
        $sortOrder = request()->query('sort_order', 'desc');

        if (request()->has('search')) {
            $query = $this->applySearch($query, request()->get('search'));
        }

        if (request()->has('filters')) {
            $query = $this->applyFilters($query, request()->get('filters'));
        }

        if (! empty($this->eagerLoad)) {
            $query = $query->with($this->eagerLoad);
        }

        $result = $query->orderBy($this->slug.'.id', $sortOrder)->paginate($perPage);

        return $result->withQueryString();
    }

    protected function applySearch($query, $search)
    {
        if (is_numeric($search)) {
            $query->where(function ($query) use ($search) {
                $query->where('id', $search);
            });
        } else {
            if (! empty($this->search)) {
                foreach ($this->search as $column) {
                    $query->orWhere($column, 'like', '%'.$search.'%');
                }
            }
        }

        return $query;
    }

    protected function applyFilters($query, $filters)
    {
        self::decodeFilters($filters);

        return self::filteredQuery($query);
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

    public function columns()
    {
        return $this->indexColumns();
    }

    /**
     * Transform result into resource Collection.
     * By default it simply returns the result so if any
     * transformation needed - overwrite this method on
     * Model resource class (app/Invicta/resources/Model).
     */
    public function indexResource($request)
    {
        return null;
    }

    public function indexColumns()
    {
        return [];
    }
}
