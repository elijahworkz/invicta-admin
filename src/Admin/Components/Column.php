<?php

namespace Elijahworkz\InvictaAdmin\Admin\Components;

use Illuminate\Support\Fluent;

class Column
{
    protected static $column;

    public static function make($label)
    {
        return new Fluent(['label' => $label, 'sortable' => false]);
    }

    public static function id($label = 'ID')
    {
        return new Fluent([
            'label' => $label,
            'sortable' => true,
            'width' => 80,
            'headerAlign' => 'center',
            'align' => 'center',
        ]);
    }

    public static function boolean($label)
    {
        return new Fluent([
            'label' => $label,
            'boolean' => true,
            'width' => 100,
            'headerAlign' => 'center',
            'align' => 'center',
        ]);
    }

    public static function list($label)
    {
        return new Fluent([
            'label' => $label,
            'list' => true,
            'titleField' => 'title',
        ]);
    }
}
