<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Elijahworkz\InvictaAdmin\Http\Resources\ItemsCollection;
use Illuminate\Support\Str;

trait ListsItems
{
    public $defaultSortOrder = 'desc';

    /**
     * Overwrite these settings to customize index table
     * https://element-plus.org/en-US/component/table.html#table-attributes.
     */
    public function indexTableSettings()
    {
        return [
            'stripe' => false,
            'size' => 'default',
            'fit' => true,
            'showHeader' => true,
            'tableLayout' => 'auto',
            'border' => false,
            'flexible' => false,
        ];
    }

    public function indexColumns()
    {
        return [];
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

    protected function indexQuery()
    {
        $query = $this->model()->query();
        $perPage = request()->query('per_page', 10);
        $sortBy = request()->query('sort_by', 'id');
        $sortOrder = request()->query('sort_order', $this->defaultSortOrder);

        $table = $this->model()->getTable();

        // localization
        if ($this->localizable()) {
            $query = $this->localizeQuery($query);
        }

        if (request()->has('search')) {
            $query = $this->applySearch($query, request()->get('search'));
        }

        if (request()->has('filters')) {
            $query = $this->applyFilters($query, request()->get('filters'));
        }

        $query = $this->modifyIndexQuery($query, request()->user());

        if (! empty($this->indexWith)) {
            $query = $query->with($this->indexWith);
        }

        $orderBy = Str::of($sortBy)->endsWith('_count')
            ? $sortBy
            : $table.'.'.$sortBy;

        $result = $query->orderBy($orderBy, $sortOrder)->paginate($perPage);

        return $result->withQueryString();
    }

    public function selectAll()
    {
        $query = $this->model()->query();
        $table = $this->model()->getTable();

        // localization
        if ($this->localizable()) {
            $query = $this->localizeQuery($query);
        }

        if (request()->has('filters')) {
            $query = $this->applyFilters($query, request()->get('filters'));
        }

        if (request()->has('search')) {
            $query = $this->applySearch($query, request()->get('search'));
        }

        return $query->select('id')->get()->pluck('id');
    }

    public function modifyIndexQuery($query, $user)
    {
        return $query;
    }

    public function resourceOrdered()
    {
        $model = $this->model();

        $select = collect($this->indexColumns())
            ->filter(function ($item) {
                return ! $item->hidden;
            })
            ->keys()
            ->push($model::orderColumnName())
            ->all();

        return $model->query()
            ->select($select)
            ->ordered()
            ->get();
    }

    public function relatedQuery($relationship)
    {
        $related = $this->model()->$relationship()->getRelated();

        return $this->itemsQuery($related);
    }

    public function itemsQuery($query = null)
    {
        if (! $query) {
            $query = $this->model();
        }

        $paginate = request()->query('paginate', false);

        $title = request()->query('title', 'title');

        $title = Str::of($title)->contains('.') ? 'id' : $title;

        $where = null;

        if ($search = request()->query('search', false)) {
            $query = $query->where($title, 'like', $search.'%');
        }

        if (request()->has('filters')) {
            $query = $this->applyFilters($query, request()->get('filters'));
        } else {
            // apply any limitation on the query here ONLY if there are no active filters
            if ($where = request()->query('where', false)) {
                $query = $query->whereRaw($where);
            }
        }

        $sortBy = request()->query('sort_by', 'id');
        $sortBy = $sortBy == 'title' ? $title : $sortBy;
        $sortOrder = request()->query('sort_order', 'desc');

        // If no paginate then this is probably a request for a simple options list
        if (! $paginate) {
            return $query->orderBy($sortBy, $sortOrder)->pluck('id', $title);
        }

        $perPage = request()->query('per_page', 10);
        $exclude = request()->query('exclude', []);
        $select = ['id', "{$title} as title", 'created_at'];
        $requestSelect = request()->query('select');

        if (is_array($requestSelect)) {
            $select = [...$select, ...$requestSelect];
        }

        $result = $query
            ->select($select)
            ->whereNotIn('id', $exclude)
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage)
            ->withQueryString();

        $params = [
            'paginate' => true,
            'title' => $title,
            'select' => $requestSelect,
            'exclude' => $exclude,
        ];

        if ($where) {
            $params['where'] = $where;
        }

        return (new ItemsCollection($result))
            ->additional([
                'params' => $params,
                'meta' => [
                    ...request()->only('search', 'filters'),
                    'filterBadges' => $this->filterBadges(),
                ],
                'handle' => $this->handle(),
            ]);
    }

    protected function applySearch($query, $search)
    {
        if (! empty($this->search)) {
            $query->where(function ($query) use ($search) {
                collect($this->search)
                    ->each(function ($column) use ($query, $search) {
                        if (is_numeric($search)) {
                            $query->orWhere($column, $search);
                        } else {
                            $query->orWhere($column, 'like', '%'.$search.'%');
                        }
                    });
            });
        } elseif (is_numeric($search)) {
            $query->where(function ($query) use ($search) {
                $query->where('id', $search);
            });
        }

        return $query;
    }

    protected function applyFilters($query, $filters)
    {
        self::decodeFilters($filters);

        return self::filteredQuery($query);
    }
}
