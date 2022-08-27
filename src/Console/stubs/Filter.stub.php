<?php

namespace {{ namespace }};

use Eteacher\InvictaAdmin\Admin\Filters\Filter;

class {{ class }} extends Filter
{
    /**
     * Apply filter to the query
     * @param  EloquentQueryBuilder $query
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