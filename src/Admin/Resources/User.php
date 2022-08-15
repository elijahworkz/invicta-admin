<?php

namespace Eteacher\InvictaAdmin\Admin\Resources;

use App\Invicta\Filters\GroupFilter;
use Carbon\Carbon;
use Eteacher\InvictaAdmin\Admin\Components\Column;

class User extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\User';

    public $editWith = ['groups:id,title'];

    public $itemTitle = 'name';

    public $handle = 'users';

    public $icon = 'users';

    public $search = ['name', 'email'];

    /**
     * Transform result into resource Collection.
     * Leave null to get all data from model.
     * If you need to customize the output - specify
     * an array of key => values here which will be
     * used in toArray() method in response.
     */
    public function indexResource($request)
    {
        return [
            'id' => $this->id,
            'active' => $this->active,
            'name' => function () {
                return "<div class='mb-1 font-bold'>{$this->name}</div>{$this->email}";
            },
            'email' => $this->email,
            'groups' => $this->groups()->get()->pluck('title')->map(fn ($title) => "<div class='mb-1'>$title</div>")->join(''),
            'regisration' => Carbon::parse($this->created_at)->toFormattedDateString(),
        ];
    }

    /**
     * List of columns to be displayed in resource table.
     * Key of each column must be same as column name or
     * key in indexResource().
     */
    public function indexColumns()
    {
        return [
            'id' => Column::id(),
            'active' => Column::boolean('Active'),
            'name' => Column::make('Name')->sortable(),
            'email' => Column::make('Email'),
            'groups' => Column::make('Groups'),
            'regisration' => Column::make('Registration Date'),
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
                    'id' => 'id',
                    'type' => 'hidden',
                ],
                [
                    'id' => 'name',
                    'type' => 'text',
                    'validation' => 'required',
                ],
                [
                    'id' => 'email',
                    'type' => 'text',
                    'validation' => 'required',
                ],
                [
                    'id' => 'password',
                    'type' => 'text',
                ],
            ],
            'sidebar' => [
                'fields' => [
                    [
                        'id' => 'active',
                        'label' => 'Active Status',
                        'type' => 'toggle',
                        'inline' => false,
                        'props' => [
                            'active-value' => 1,
                            'inactive-value' => 0,
                            'active-text' => 'Active',
                            'inactive-text' => 'Inactive',
                        ],
                        'if' => [
                            'id' => 'id',
                            'operator' => '!=',
                            'value' => null,
                        ],
                    ],
                    [
                        'id' => 'groups',
                        'type' => 'relatedSelect',
                        'props' => [
                            'multiple' => true,
                        ],
                        'validation' => 'required',
                    ],
                ],
            ],
        ];
    }

    public function filters()
    {
        return [
            new GroupFilter,
        ];
    }
}
