<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait HasFilters
{
    private static $filters;

    protected static function decodeFilters($filters)
    {
        self::$filters = json_decode(base64_decode($filters), true);
    }

    protected static function filteredQuery($query)
    {
        foreach (self::$filters as $filter => $value) {
            if (is_array($value)) {
                $query->where(function ($query) use ($filter, $value) {
                    $query->whereIn($filter, $value);
                });
            } else {
                $query->where(function ($query) use ($filter, $value) {
                    $query->where($filter, $value);
                });
            }
        }

        return $query;
    }
}
