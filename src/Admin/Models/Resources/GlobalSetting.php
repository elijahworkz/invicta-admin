<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Resources;

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Models\Actions\EditJsonField;
use Elijahworkz\InvictaAdmin\Admin\Models\Actions\ExportSettings;
use Elijahworkz\InvictaAdmin\Admin\Models\Actions\ImportSettings;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;
use Elijahworkz\InvictaAdmin\Admin\Traits\Localizable;
use Elijahworkz\InvictaAdmin\Facades\Permission;

class GlobalSetting extends Resource
{
    use Localizable;

    public $model = 'Elijahworkz\InvictaAdmin\Admin\Models\GlobalSetting';

    public $canChangeBlueprints = true;

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'title';

    public $menuTitle = 'Settings';

    public $icon = 'settings';

    public $search = ['title'];

    public function createTitle()
    {
        return 'New Global Set';
    }

    public function indexResource($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'handle' => $this->handle,
        ];
    }

    public function indexColumns()
    {
        return [
            'id' => Column::id(),
            'title' => Column::make('Title')->sortable()->editLink(),
            'handle' => Column::make('Handle'),
        ];
    }

    public function modifyBlueprint($blueprint)
    {
        $sidebar = [
            [
                'id' => 'id',
                'type' => 'hidden',
            ],
        ];

        if (request()->user()->can('edit blueprint global_settings')) {
            $sidebar = array_merge($sidebar, [
                [
                    'id' => 'blueprint',
                    'type' => 'blueprint',
                    'options' => $this->availableBlueprints(),
                    'defaultValue' => 'default',
                ],
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
            ]);
        } else {
            $sidebar = array_merge($sidebar, [
                [
                    'id' => 'title',
                    'type' => 'text',
                    'validation' => 'required',
                    'readOnly' => true,
                ],
            ]);
        }
        $blueprint->addToSidebar($sidebar);
    }

    public function actions()
    {
        return [
            new ExportSettings,
            new ImportSettings,
            new EditJsonField,
        ];
    }

    public function modifyIndexQuery($query, $user)
    {
        //user has global permission then not modify query
        $permissions = $user->permissions();
        if ($user->isDev() || $permissions->contains('edit global_settings')) {
            return $query;
        }

        //filter items by global settings exeptions that current user has
        $permittedIds = $permissions
            ->filter(fn ($item) => str($item)->startsWith('edit global_settings_item'))
            ->map(function ($item) {
                $item = str($item)->replace('edit global_settings_item ', '');

                return $item;
            })->toArray();

        return $query->whereIn('id', $permittedIds);
    }
}
