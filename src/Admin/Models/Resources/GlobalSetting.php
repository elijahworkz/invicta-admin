<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;
use Eteacher\InvictaAdmin\Facades\Permission;

class GlobalSetting extends Resource
{
    public $model = 'Eteacher\InvictaAdmin\Admin\Models\GlobalSetting';

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

        if (request()->user()->can('edit blueprint '.$this->handle())) {
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

    public function permissions()
    {
        $label = str($this->handle())->ucfirst()->replace('_', ' ');

        return [
            Permission::make('edit blueprint '.$this->handle())->label('Edit blueprint '.$label),
        ];
    }
}
