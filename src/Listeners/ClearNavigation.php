<?php

namespace Eteacher\InvictaAdmin\Listeners;

use Eteacher\InvictaAdmin\Admin\Navigation\Navigation;

class ClearNavigation
{
    public function __construct(public Navigation $navigation)
    {

    }

    public function handle()
    {
        $this->navigation->clearNavigations();
        //send notification to admin
    }
}
