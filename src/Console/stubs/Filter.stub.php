<?php

namespace {{ namespace }};

use Elijahworkz\InvictaAdmin\Admin\Filters\Filter;

class {{ class }} extends Filter
{
    /**
     * Apply filter to the query
     * @param  Illuminate\Database\Eloquent\Builder $query
     * @param  mixed $value Filter value
     * @return mixed
     */
    public function apply($query, $value)
    {
        return $query;
    }

    /**
     * Set Filter options
     *
     * @return array
     */
    public function options()
    {
        return [];
    }
}
