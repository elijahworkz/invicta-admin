<?php

namespace {{ namespace }};

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class {{ class }} extends Action
{
    /**
     * Action type - possible values: 'inline', 'bulk', 'global'.
     * default value = 'inline'
     *
     * @var string
     */
    public $type = 'inline';

    /**
     * Open in modal window or in drawer.
     * default value = true
     *
     * @var string
     */
    public $modal = true;

    /**
     * Indicates whether action should be pushed to queue
     * default value = false
     *
     * @var boolean
     */
    public $shouldQueue = false;


    /**
     * Changes the color of the action button
     * default value = false
     *
     * @var boolean
     */
    public $dangerous = false;

    /**
     * Changes submission button. 'false' value will hide the button
     * default value = 'Run Action'
     *
     * @var string
     */
    public $actionButton =  'Run Action';


    /**
     * Perform the action on the given models.
     * @param  Fluent     $fields available fields
     * @param  Collection $models modelds to perform action on
     * @param  User       $user authenticated user
     * @return mixed
     */
    public function handle($fields, Collection $models, $user)
    {
        // code...
    }

    /**
     * Get blueprint with fields if neccessary.
     *
     * @param ModelInstance $item available only for inline/drawer actions
     * @return array
     */
    public function blueprint($item = null)
    {
        return [];
    }

    /**
     * Authorize action for given user and model.
     */
    public function authorize($user, $model)
    {
        return true;
    }
}
