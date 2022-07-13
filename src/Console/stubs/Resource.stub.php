<?php

namespace {{ namespace }};

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class {{ class }} extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'App\Models\{{ class }}';

    public $eagerLoad = '';

    public $title = '{{ title }}';

    public $slug = '{{ slug }}';

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
            'id' => Column::make('ID'),
        ];
    }


}
