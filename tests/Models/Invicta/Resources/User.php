<?php

namespace Eteacher\InvictaAdmin\Tests\Models\Invicta\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class User extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Eteacher\InvictaAdmin\Tests\Models\User';

    public $title = 'Users';

    public $slug = 'users';

    public $icon = 'users';

    public $search = ['name', 'email'];

    public $eagerLoad = '';

    public function indexResource($request, $fluent = false)
    {
        return [
            'name' => $this->name,
            'created_at' => $this->created_at,
            'email' => $this->email,
            'test' => function () {
                return '<strong>'.$this->name.'</strong><br/>'.$this->email;
            },
        ];
    }

    public function columns()
    {
        return [
            'name' => Column::make('Name'),
            'email' => Column::make('Email')->resizable(true)->align('center'),
            'created_at' => Column::make('Date')->width(120)->sortable(true),
            'test' => Column::make('State')->headerAlign('center'),
        ];
    }
}
