<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait HasActions
{
    public function actions()
    {
        return null;
    }

    public function handleActionRequest()
    {
        // get fields,
        // get models ids - convert to collection of models
    }
}
