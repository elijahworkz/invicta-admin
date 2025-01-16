<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models\Invicta\Resources;

use Elijahworkz\InvictaAdmin\Admin\Components\Column;
use Elijahworkz\InvictaAdmin\Admin\Resources\Resource;

class Course extends Resource
{
    /**
     * The underlying resource model.
     */
    public $model = 'Elijahworkz\InvictaAdmin\Tests\Models\Course';

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
