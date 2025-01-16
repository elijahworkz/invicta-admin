<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models\Invicta\Resources;

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class Student extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Elijahworkz\InvictaAdmin\Tests\Models\Student';

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
