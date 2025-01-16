<?php

namespace Elijahworkz\InvictaAdmin\Admin\Models\Actions;

use Elijahworkz\InvictaAdmin\Admin\Actions\Action;
use Elijahworkz\InvictaAdmin\Admin\Models\GlobalSetting;
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
     * Handle action given fields, models to operate on and user
     *
     * @param  \Illuminate\Support\Fluent  $fields
     * @param  \App\Models\User  $user
     * @return void
     */
    public function handle($fields, ?Collection $models, $user)
    {
        return GlobalSetting::create($fields->global);
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param  ModelInstance  $item  available only for inline/drawer actions
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
