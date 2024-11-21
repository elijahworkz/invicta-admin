<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Actions;

use Elijahworkz\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class EditJsonField extends Action
{
    public $type = 'inline';

    public $modal = false;

    public $actionButton = 'Save';

    protected $jsonField = 'data';

    /**
     * Handle action given fields, models to operate on and user
     *
     * @param  \Illuminate\Support\Fluent  $fields
     * @param  \App\Models\User  $user
     * @return void
     */
    public function handle($fields, Collection $models, $user)
    {
        $model = $models->first();

        $model->data = $fields[$this->jsonField];

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
