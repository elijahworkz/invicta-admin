<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Carbon\Carbon;
use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Models\Actions\ImpersonateUser;
use Eteacher\InvictaAdmin\Admin\Models\Filters\GroupFilter;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class User extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\User';

    public $titleField = 'name';

    public $editWith = ['groups:id,title'];

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
            'isSuper' => method_exists($this->model(), 'isSuper') ? $this->isSuper() : false,
            'name' => function () {
                $html = "<div class='mb-1 font-bold'>";

                if (auth()->user()->can('edit users')) {
                    $html .= "<a href='{$this->route()}/{$this->id}' class='edit-link'>{$this->name}</a>";
                } else {
                    $html .= $this->name;
                }
                $html .= "</div>{$this->email}";

                return $html;
            },
            'email' => $this->email,
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
            'isSuper' => Column::boolean('Is Super'),
            'name' => Column::make('Name')->sortable(),
            'email' => Column::make('Email'),
            'regisration' => Column::make('Registration Date'),
        ];
    }

    public function blueprint($item = null)
    {
        return [
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
                    'validation' => 'required_if:id,null|min:8|nullable',
                ],
                [
                    'id' => 'favorite_campaigns',
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
                        'defaultValue' => 1,
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

    public function actions()
    {
        return [
            new ImpersonateUser(),
        ];
    }
}
