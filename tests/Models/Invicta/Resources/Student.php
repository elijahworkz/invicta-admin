<?php

namespace Eteacher\InvictaAdmin\Tests\Models\Invicta\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class Student extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Eteacher\InvictaAdmin\Tests\Models\Student';

    public $title = 'Students';

    public $slug = 'students';

    protected $handle = 'students';

    public $icon = 'users';

    public $search = ['email'];

    public $eagerLoad = '';

    public function indexResource($request, $fluent = false)
    {
        return [
            'email' => $this->email,
            'created_at' => $this->created_at,
        ];
    }

    public function columns()
    {
        return [
            'email' => Column::make('Email')->resizable(true)->align('center'),
            'created_at' => Column::make('Date')->width(120)->sortable(true),
        ];
    }
}
