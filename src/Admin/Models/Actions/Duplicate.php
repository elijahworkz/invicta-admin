<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;

class Duplicate extends Action
{
    // public $inline = false;

    public function handle($fields, $models)
    {
        foreach ($models as $model) {
            $model->repicate();
        }
    }

    public function fields()
    {
        return [];
    }
}
