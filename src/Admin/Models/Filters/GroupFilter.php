<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Filters;

use Elijahworkz\InvictaAdmin\Admin\Filters\Filter;
use Elijahworkz\InvictaAdmin\Admin\Models\Group;

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
