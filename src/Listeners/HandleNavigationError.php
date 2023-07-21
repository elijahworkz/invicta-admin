<?php

namespace Eteacher\InvictaAdmin\Listeners;

use Eteacher\InvictaAdmin\Admin\Navigation\Navigation;
use Eteacher\InvictaAdmin\Events\NavigationError;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleNavigationError implements ShouldQueue
{
    public function __construct(public Navigation $navigation)
    {
    }

    public function handle(NavigationError $event)
    {
        $this->navigation->handleNavigationError($event->menu);
        //send notification to admin
    }
}
