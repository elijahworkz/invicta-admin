<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Resources;

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class Group extends Resource
{
    public $model = 'Elijahworkz\InvictaAdmin\Admin\Models\Group';

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'title';

    public $indexWith = ['users:id'];

    public $editWith = ['users:id,name', 'permissions'];

    public $icon = 'user-group';

    public $search = ['title'];

    public function indexResource($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'handle' => $this->handle,
            'users' => $this->users->count(),
        ];
    }

    public function indexColumns()
    {
        return [
            'id' => Column::id(),
            'title' => Column::make('Title')->sortable()->editLink(),
            'handle' => Column::make('Handle'),
            'users' => Column::make('Users')->align('center'),
        ];
    }

    public function blueprint($item = null)
    {
        return [
            'settings' => [
                'tabs' => [
                    'stretch' => false,
                    'tabPosition' => 'top',
                ],
            ],
            'fields' => [
                [
                    'id' => 'title',
                    'type' => 'text',
                    'validation' => 'required',
                ],
                [
                    'id' => 'handle',
                    'type' => 'slug',
                    'source' => 'title',
                    'validation' => 'required',
                ],
                [
                    'id' => 'users',
                    'type' => 'relatedList',
                    'titleField' => 'name',
                    'options' => [
                        'addItems' => true,
                        'createItems' => true,
                    ],
                    'createWith' => [
                        'field' => 'groups',
                        'multiple' => true,
                    ],
                ],
            ],
        ];
    }
}
