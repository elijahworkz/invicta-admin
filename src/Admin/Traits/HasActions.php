<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait HasActions
{
    public function actions()
    {
        return null;
    }

    public function resourceActions($user, $model)
    {
        return collect($this->actions())->filter(function ($action) use ($user, $model) {
            return $action->inline() && $action->authorize($user, $model);
        })->values();
    }
}
