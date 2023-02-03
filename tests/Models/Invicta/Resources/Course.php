<?php

namespace Eteacher\InvictaAdmin\Tests\Models\Invicta\Resources;

use Eteacher\InvictaAdmin\Admin\Components\Column;
use Eteacher\InvictaAdmin\Admin\Resources\Resource;

class Course extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Eteacher\InvictaAdmin\Tests\Models\Course';

    public $title = 'Courses';

    public $slug = 'courses';

    protected $handle = 'courses';

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
