<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

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

    public $icon = 'global-setting';

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

    public function postProcessBlueprint($blueprint)
    {
        return $blueprint->addToSidebar([
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
                'id' => 'blueprint',
                'type' => 'hidden',
            ],
        ]);
    }
}