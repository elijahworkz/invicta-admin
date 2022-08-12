<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

class Group extends Resource
{
    public $model = 'Eteacher\InvictaAdmin\Admin\Models\Group';

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $itemTitle = 'id';

    public $icon = 'resource';

    public $search = [];

    protected $handle = 'groups';
}
