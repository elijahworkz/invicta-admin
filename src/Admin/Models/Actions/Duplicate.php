<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;

class Duplicate extends Action
{
    public $inline = true;

    public $dangerous = true;

    public $shouldQueue = true;

    public function handle($fields, $models)
    {
        foreach ($models as $model) {
            $newModel = $model->replicate();
            $newModel->email = $fields->new_key;
            $newModel->save();
        }
    }

    public function fields()
    {
        return [
            [
                'id' => 'new_key',
                'type' => 'text',
                'validation' => 'required',
            ],
        ];
    }
}
