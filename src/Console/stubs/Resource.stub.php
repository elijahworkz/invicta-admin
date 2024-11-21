<?php

namespace {{ namespace }};

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class {{ class }} extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\{{ class }}';

    /**
     * List of relationships that should be eager loaded on index.
     *
     * @var string
     */
    public $indexWith;

    /**
     * List of relationships that should be eager loaded on edit.
     *
     * @var string
     */
    public $editWith;

    /**
     * The name that should be used in the menu.
     *
     * @var string
     */
    public $menuTitle = null;

    /**
     * The column name that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public $titleField = 'id';

    public $icon = 'resource';

    public $search = [];

    /**
     * Transform result into resource Collection.
     * Leave null to get all data from model.
     * If you need to customize the output - specify
     * an array of key => values here which will be
     * used in toArray() method in response
     *
     */
    public function indexResource($request)
    {
        return null;
    }

    /**
     * List of columns to be displayed in resource table.
     * Key of each column must be same as column name or
     * key in indexResource()
     */
    public function indexColumns()
    {
        return [
            'id' => Column::id(),
            'title' => Column::make('Title'),
        ];
    }

    /**
     * List of filters to use on resource
     *
     * @return array of Filters
     */
    public function filters()
    {
        return null;
    }

    /**
     * List of actions to use on resource
     *
     * @return array of actions
     */
    public function actions()
    {
        return [];
    }
}
