<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Str;

trait AvailableForNavigation
{
    public $navTitle;

    public $hideDrafs = true;

    private $availableForNavigation = true;

    /**
     * Resource context.
     */
    public function navTitle()
    {
        return $this->navTitle
            ? $this->navTitle
            : Str::of($this->model)->classBasename();
    }

    public function prefix()
    {
        return '';
    }
}
