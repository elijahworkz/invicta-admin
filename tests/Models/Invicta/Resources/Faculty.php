<?php

namespace Eteacher\InvictaAdmin\Tests\Models\Invicta\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class Faculty extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Eteacher\InvictaAdmin\Tests\Models\Faculty';

    public $title = 'Faculty';

    public $slug = 'faculty';

    protected $handle = 'faculty';

    public function indexResource($request, $fluent = false)
    {
        return [
            'title' => $this->title,
            'created_at' => $this->created_at,
        ];
    }

    public function columns()
    {
        return [
            'created_at' => Column::make('Date')->width(120)->sortable(true),
        ];
    }
}
