<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use Eteacher\InvictaAdmin\Admin\Traits\HasFilters;
use Illuminate\Support\Facades\App;

class Resource
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

    private $routePrefix = '/resource/';

    public function __construct()
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

        return $this->resourceCollection($result->withQueryString());
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

    /**
     * Transform result into resource Collection.
     * By default it simply returns the result so if any
     * transformation needed - overwrite this method on
     * Model resource class (app/Invicta/resources/Model).
     */
    protected function resourceCollection($resource)
    {
        return $resource;
    }
}
