<?php

namespace Eteacher\InvictaAdmin\Admin\Components;

use Illuminate\Support\Fluent;

class Column
{
    public static function make($label)
    {
        return new Fluent(['label' => $label, 'sortable' => false]);
    }
}
