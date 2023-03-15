<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class EditJsonField extends Action
{
    public $type = 'inline';

    public $modal = false;

    public $actionButton = 'Save';

    protected $jsonField = 'data';

    public function handle($fields, Collection $models, $user)
    {
        $field = $this->jsonField == 'data' ? '_data' : $this->jsonField;
        $model = $models->first();

        $model->data = $fields[$field];

        $model->save();
    }

    public function blueprint($item = null)
    {
        return [
            'fields' => [
                [
                    'id' => $this->jsonField,
                    'type' => 'code',
                    'defaultValue' => $item->data ?? [],
                ],
            ],
        ];
    }

    public function authorize($user, $model)
    {
        $attributes = $model->getAttributes();

        if (! array_key_exists($this->jsonField, $attributes)) {
            return false;
        }

        return $user->isDev();
    }
}
