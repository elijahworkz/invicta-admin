<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Actions;

use Elijahworkz\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class ExportSettings extends Action
{
    public $modal = false;

    /**
     * Changes submission button. 'false' value will hide the button
     * default value = 'Run Action'
     *
     * @var string
     */
    public $actionButton = false;

    /**
     * Handle action given fields, models to operate on and user
     *
     * @param  \Illuminate\Support\Fluent  $fields
     * @param  \App\Models\User  $user
     * @return void
     */
    public function handle($fields, Collection $models, $user)
    {
        // code...$fields, $models, $user
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item  available only for inline/drawer actions
     * @return array
     */
    public function blueprint($item = null)
    {
        $value = [
            'title' => $item->title,
            'handle' => $item->handle,
            'blueprint' => $item->blueprint,
            'locale' => $item->locale,
            'origin_id' => $item->origin_id,
            'data' => $item->data,
        ];

        return [
            'fields' => [
                [
                    'id' => '_export',
                    'type' => 'code',
                    'defaultValue' => $value,
                    'readOnly' => true,
                ],
            ],
        ];
    }

    /**
     * Authorize action for given user and model.
     */
    public function authorize($user, $model)
    {
        return $user->isDev();
    }
}
