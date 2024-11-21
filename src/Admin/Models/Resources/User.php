<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Resources;

use App\Models\User as UserModel;
use Carbon\Carbon;
use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Models\Actions\ImpersonateUser;
use Elijahworkz\InvictaAdmin\Admin\Models\Filters\GroupFilter;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class User extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\User';

    public $titleField = 'name';

    public $indexWith = ['groups:id,title'];

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
        $last_login = $this->last_login ? Carbon::parse($this->last_login) : null;

        return [
            'id' => $this->id,
            'active' => $this->active,
            'dev' => $this->dev,
            'title' => $this->displayUserName($request),
            'email' => $this->email,
            'groups' => $this->groups()->get()->pluck('title')->map(fn ($title) => "<div class='mb-1'>$title</div>")->join(''),
            'registration' => Carbon::parse($this->created_at)->toFormattedDateString(),
            'last_login' => $last_login
                ? ($last_login->diffInMonths(Carbon::now()) <= 6 ? $last_login->diffForHumans() : $last_login->toFormattedDateString())
                : '',
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
            'dev' => Column::boolean('Is Dev'),
            'title' => Column::make('Name')->sortable()->editLink(),
            'email' => Column::make('Email'),
            'registration' => Column::make('Registration Date'),
            'last_login' => Column::make('Last Login'),
            'groups' => Column::make('Groups')->hidden(),
        ];
    }

    public function displayUserName($request)
    {

        return <<<HTML
            <div class="mb-1 font-bold">
                {$this->name}
            </div>
            <span>{$this->email}</span>
        HTML;
    }

    public function blueprint($item = null)
    {
        $blueprint = [
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
                    'id' => 'data.avatar',
                    'type' => 'asset',
                    'props' => [
                        'folder' => 'users',
                    ],
                ],
            ],
            'sidebar' => [
                'fields' => [
                    [
                        'id' => 'groups',
                        'type' => 'relatedSelect',
                        'props' => [
                            'multiple' => true,
                        ],
                        'validation' => 'required_unless:dev,true',
                    ],

                ],
            ],
        ];

        if (request()->user()->isDev()) {
            $blueprint['sidebar']['fields'][] = [
                'id' => 'dev',
                'label' => 'Dev Admin',
                'type' => 'toggle',
                'inline' => true,
                'customClass' => 'divided',
                'defaultValue' => false,
            ];
        }

        return $blueprint;
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
            new ImpersonateUser,
        ];
    }

    public function beforeSave($item, $action)
    {
        if ($hook = UserModel::getBeforeSaveHook()) {
            $item = $hook::run($item, $this->handle(), $action);
        }

        return $item;
    }

    public function afterSave($item, $action)
    {
        if ($hook = UserModel::getAfterSaveHook()) {
            $hook::run($item, $this->handle(), $action);
        }
    }
}
