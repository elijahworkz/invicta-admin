<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Facades\Blueprint;

trait CanEditItems
{
    /**
     * Set blueprint from function.
     *
     * @param Illuminate\Database\Eloquent\Model $item
     * @return array
     */
    public function blueprint($item = null)
    {
        //
    }

    public function getBlueprint($item = null)
    {
        return Blueprint::findForResource($this, $item);
    }
}
