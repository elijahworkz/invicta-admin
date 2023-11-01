<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class Navigation extends Resource
{
    public $model = 'Eteacher\InvictaAdmin\Admin\Models\Navigation';

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

    public function displayTitle()
    {
        $prefix = config('invicta.path');

        return <<<HTML
            <a href="{$prefix}/navigation/{$this->id}/items" class="edit-link">{$this->title}</a>
        HTML;
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
