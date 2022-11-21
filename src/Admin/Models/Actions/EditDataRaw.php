<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;

class EditDataRaw extends Action
{
    public $name = 'Edit data field';

    public $modal = false;

    public $actionButton = 'Save';

    public function handle($fields, $models, $user)
    {
        foreach ($models as $model) {
            $model->data = $fields['_data'];
            $model->save();
        }
    }

    public function blueprint($item = null)
    {
        return [
            'fields' => [
                [
                    'id' => 'data',
                    'type' => 'code',
                    'defaultValue' => $item->data,
                ],
            ],
        ];
    }

    public function authorize($user, $model)
    {
        return $user->can('run edit data raw action') && isset($model->data);
    }
}
