<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\App;

trait HasFilters
{
    public static $filterBadges;

    private static $filters;

    public function filters()
    {
        return null;
    }

    public function filterBadges()
    {
        return self::$filterBadges;
    }

    protected static function decodeFilters($filters)
    {
        self::$filters = json_decode(base64_decode($filters), true);
    }

    protected static function filteredQuery($query)
    {
        foreach (self::$filters as $filter => $value) {
            $filterClass = App::make($filter);

            self::filterBadge($filterClass, $value);

            $query = $filterClass->apply($query, $value);
        }

        return $query;
    }

    protected static function filterBadge($filterClass, $filterValue)
    {
        self::$filterBadges[get_class($filterClass)] = $filterClass->badge($filterValue);
    }
}
