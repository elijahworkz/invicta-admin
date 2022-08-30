<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class Group extends Resource
{
    public $model = 'Eteacher\InvictaAdmin\Admin\Models\Group';

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'title';

    public $editWith = ['users:id,name', 'permissions'];

    public $icon = 'user-group';

    public $search = ['title'];

    protected $handle = 'groups';

    public function indexResource($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
        ];
    }

    public function indexColumns()
    {
        return [
            'id' => Column::id(),
            'title' => Column::make('Title')->sortable()->editLink(),
        ];
    }

    public function blueprint()
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
                    'type' => 'text',
                    'validation' => 'required',
                ],
                [
                    'id' => 'users',
                    'type' => 'relatedList',
                    'titleField' => 'name',
                    'options' => [
                        'addItems' => true,
                        'createItems' => true,
                        'actions' => ['edit', 'delete'],
                    ],
                ],
            ],
        ];
    }
}
