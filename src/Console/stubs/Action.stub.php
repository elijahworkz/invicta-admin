<?php

namespace {{ namespace }};

use Eteacher\InvictaAdmin\Admin\Actions\Action;
use Illuminate\Database\Eloquent\Collection;

class {{ class }} extends Action
{
    /**
     * Bulk or single model action if set to true
     *
     * @var boolean
     */
    public $inline = false;

    /**
     * Changes the color of the action button
     * 
     * @var boolean
     */
    public $dangerous = false;

    /**
     * Indicates whether action should be pushed to queue
     *
     * @var boolean
     */
    public $shouldQueue = false;

    /**
     * Action type - possible values: 'modal', 'drawer' or 'link'
     * 
     * @var string
     */
    public $type = 'modal';
    
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
}
