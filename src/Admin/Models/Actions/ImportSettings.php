<?php

namespace Eteacher\InvictaAdmin\Admin\Models\Actions;

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Eteacher\InvictaAdmin\Admin\Models\GlobalSetting;

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
     * Handle action given fields, models to operate on and user
     *
     * @param  Illuminate\Support\Fluent  $fields
     * @param  Collection  $models
     * @param  App\Models\User  $user
     * @return void
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
