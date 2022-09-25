<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Http\Resources\ItemsCollection;

trait ListsItems
{
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
        $sortOrder = request()->query('sort_order', 'desc');

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

        $result = $query->orderBy($this->handle().'.'.$sortBy, $sortOrder)->paginate($perPage);

        return $result->withQueryString();
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
        if ($item = request()->query('item', false)) {
            $related = $this->findModel($item)->$relationship();
        } else {
            $related = $this->model()->$relationship()->getRelated();
        }

        // need to apply any limitation on the query here
        if ($where = request()->query('where', false)) {
            $related = $related->whereRaw($where);
        }

        return $this->itemsQuery($related);
    }

    public function itemsQuery($query = null)
    {
        if (! $query) {
            $query = $this->model();
        }

        $paginate = request()->query('paginate', false);

        $title = request()->query('title', 'title');

        if ($search = request()->query('search', false)) {
            $query = $query->where($title, 'like', $search.'%');
        }

        if (request()->has('filters')) {
            $query = $this->applyFilters($query, request()->get('filters'));
        }

        // If no paginate then this is probably a request for a simple options list
        if (! $paginate) {
            return $query->pluck($title, 'id');
        }

        $perPage = request()->query('per_page', 10);
        $sortBy = request()->query('sort_by', 'id');
        $sortBy = $sortBy == 'title' ? $title : $sortBy;
        $sortOrder = request()->query('sort_order', 'desc');
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

        return (new ItemsCollection($result))
            ->additional([
                'params' => [
                    'paginate' => true,
                    'title' => $title,
                    'exclude' => $exclude,
                ],
                'meta' => [
                    ...request()->only('search', 'filters'),
                    'filterBadges' => $this->filterBadges(),
                ],
                'handle' => $this->handle(),
            ]);
    }

    protected function applySearch($query, $search)
    {
        if (is_numeric($search)) {
            $query->where(function ($query) use ($search) {
                $query->where('id', $search);
            });
        } else {
            if (! empty($this->search)) {
                collect($this->search)->filter(function ($column) {
                    return $column != 'id';
                })->each(function ($column) use ($query, $search) {
                    $query->orWhere($column, 'like', $search.'%');
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
