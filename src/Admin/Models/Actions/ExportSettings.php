<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
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
     * Perform the action on the given models.
     *
     * @param  Fluent  $fields available fields
     * @param  Collection  $models modelds to perform action on
     * @param  User  $user authenticated user
     * @return mixed
     */
    public function handle($fields, Collection $models, $user)
    {
        // code...$fields, $models, $user
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item available only for inline/drawer actions
     * @return array
     */
    public function blueprint($item = null)
    {
        $value = [
            'title' => $item->title,
            'handle' => $item->handle,
            'blueprint' => $item->blueprint,
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
