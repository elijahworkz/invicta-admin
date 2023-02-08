<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Carbon\Carbon;
use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Models\Actions\ImpersonateUser;
use Eteacher\InvictaAdmin\Admin\Models\Asset;
use Eteacher\InvictaAdmin\Admin\Models\Filters\GroupFilter;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;
use Illuminate\Support\Facades\Storage;

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
        $last_login = $this->last_login ? Carbon::parse($this->last_login) : null;

        return [
            'id' => $this->id,
            'active' => $this->active,
            'dev' => $this->dev,
            'name' => $this->displayUserName($request),
            'email' => $this->email,
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
            'name' => Column::make('Name')->sortable(),
            'email' => Column::make('Email'),
            'registration' => Column::make('Registration Date'),
            'last_login' => Column::make('Last Login'),
        ];
    }

    public function displayUserName($request)
    {
        $editRoute = route('invicta.resource.edit', ['resource' => 'users', 'item' => $this->id]);

        $name = $request->user()->can('edit users')
            ? "<a href='{$editRoute}' class='edit-link'>{$this->name}</a>"
            : $this->name;

        return <<<HTML
            <div class="mb-1 font-bold">
                {$name}
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
                        'folder' => 'temp',
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
            new ImpersonateUser(),
        ];
    }

    public function afterSave($item, $action)
    {
        $avatar = isset($item->data['avatar']) ? $item->data['avatar'] : null;
        $assetsPath = config('invicta.assets_path');

        if ($avatar) {
            $nameData = explode('.', $avatar['name']);
            $avatarName = 'avatar-'.$item->id.'.'.$nameData[1];
            $avatarPath = $assetsPath.'/users/'.$avatarName;
            $avatarSrc = _asset($avatarPath);

            if ($avatar['path'] != $avatarPath) {
                Storage::move($avatar['path'], $avatarPath);


                $avatar['name'] = $avatarName;
                $avatar['path'] = $avatarPath;
                $avatar['src'] = $avatarSrc;

                $item->data = [
                    ...$item->data,
                    'avatar' => $avatar,
                ];
                $item->save();

                Asset::where('id', $avatar['id'])
                    ->update([
                        'path' => $avatarPath,
                        'name' => $avatarName,
                    ]);
            }
        }
    }
}
