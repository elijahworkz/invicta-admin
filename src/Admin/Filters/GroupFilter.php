<?php

namespace App\Invicta\Filters;

use Eteacher\InvictaAdmin\Admin\Filters\Filter;
use Eteacher\InvictaAdmin\Admin\Models\Group;

class GroupFilter extends Filter
{
    public function apply($query, $value)
    {
        return $query->whereRelation('groups', 'id', $value);
    }

    public function options()
    {
        return Group::get()->pluck('title', 'id');
    }
}
