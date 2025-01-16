<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

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
        // dump('resourceActions');
        return collect($this->allActions())
            ->filter(function ($action) use ($user, $model) {
                if ($action->inline() && $action->authorize($user, $model)) {
                    $action->setItem($model);

                    if ($action->redirect) {
                        $action->setRedirect($this->handle());
                    }

                    return true;
                }

                return false;
            })->values();
    }
}
