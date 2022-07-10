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

    public $icon = 'file-table-box-multiple-outline';

    protected $routePrefix = '/resource/';

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
        // code...
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

        $result = $query->with($this->eagerLoad)->orderBy($this->slug.'.id', $sortOrder)->paginate($perPage);

        return $result->withQueryString();
    }

    protected function applySearch($query, $search)
    {
        if (strpos($search, ',')) {
            $search_array = explode(',', $search);
            $trimsearch = array_map('trim', array_filter($search_array));

            if (is_numeric($trimsearch[0])) {
                $query->where(function ($query) use ($trimsearch) {
                    $query->whereIn('id', $trimsearch);
                });
            } else {
                $query->where(function ($query) use ($search) {
                    $query->where('keywords', 'like', '%'.$search.'%');
                });
            }
        } else {
            if (is_numeric($search)) {
                $query->where(function ($query) use ($search) {
                    $query->where('id', $search);
                });
            } else {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%'.$search.'%')
                        ->orWhere('tag_name', 'like', '%'.$search.'%')
                        ->orWhere('keywords', 'like', '%'.$search.'%')
                        ->orWhere('created_by', 'like', '%'.$search.'%');
                });
            }
        }

        return $query;
    }

    protected function applyFilters($query, $filters)
    {
        self::decodeFilters($filters);

        return self::filteredQuery($query);
    }
}
