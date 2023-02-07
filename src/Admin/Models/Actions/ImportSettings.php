<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Eteacher\InvictaAdmin\Admin\Models\GlobalSetting;
use Illuminate\Database\Eloquent\Collection;

class ImportSettings extends Action
{
    public $type = 'global';

    public $modal = false;

    /**
     * Changes submission button. 'false' value will hide the button
     * default value = 'Run Action'
     *
     * @var string
     */
    public $actionButton = 'Import';

    /**
     * Perform the action on the given models.
     *
     * @param  Fluent  $fields available fields
     * @param  $models modelds to perform action on
     * @param  User  $user authenticated user
     * @return mixed
     */
    public function handle($fields, $models, $user)
    {
        return GlobalSetting::create($fields->global);
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item available only for inline/drawer actions
     * @return array
     */
    public function blueprint($item = null)
    {
        return [
            'fields' => [
                [
                    'id' => 'global',
                    'type' => 'code',
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
