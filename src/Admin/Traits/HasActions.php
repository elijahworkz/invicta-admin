<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

trait HasActions
{
    public function actions()
    {
        return [];
    }

    public function allActions()
    {
        return array_merge($this->actions(), $this->globalActions());
    }

    public function resourceActions($user, $model)
    {
        return collect($this->allActions())->filter(function ($action) use ($user, $model) {
            return $action->inline() && $action->authorize($user, $model);
        })->values();
    }
}
