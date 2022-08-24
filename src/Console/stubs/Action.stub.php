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
     * Perform the action on the given models
     * @param  Fluent     $fields available fields
     * @param  Collection $models modelds to perform action on
     * @return mixed
     */
    public function handle($fields, Collection $models)
    {
        //
    }

    /**
     * Set fields if needed for the action
     *
     * @return array 
     */
    public function fields()
    {
        return [];
    }
}
