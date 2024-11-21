<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Resources;

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class Navigation extends Resource
{
    public $model = 'Elijahworkz\InvictaAdmin\Admin\Models\Navigation';

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'title';

    public $icon = 'routes';

    public $search = ['title'];

    public $defaultSortOrder = 'asc';

    /**
     * Enables edit links to open in index view instead of separate page.
     *
     * @var bool
     */
    public $indexEdit = false;

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
            'id' => Column::id()->sortable(),
            'title' => Column::make('Title')->sortable()->customLink('/navigation/:id/items'),
            'handle' => Column::make('Handle'),
        ];
    }

    public function blueprint($item = null)
    {
        return [
            'fields' => [
                [
                    'id' => 'title',
                    'type' => 'text',
                    'validation' => 'required|string',
                ],
                [
                    'id' => 'handle',
                    'type' => 'slug',
                    'source' => 'title',
                    'validation' => 'required|string',
                ],
            ],
        ];
    }
}
