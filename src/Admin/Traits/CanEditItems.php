<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Eteacher\InvictaAdmin\Facades\Blueprint;

trait CanEditItems
{
    /**
     * Optional blueprint path.
     *
     * @var string
     */
    public $blueprintPath = null;

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

    public function validationRules()
    {
        return Blueprint::validationRules($this);
        $this->parseBlueprint('parseValidation');
    }
}
