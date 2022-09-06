<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Str;

trait AvailableForNavigation
{
    public $navTitle;

    public $hideDrafs = true;

    private $availableForNavigation = true;

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

    public function uri($item)
    {
        // we need to set locale, // $prefix
        return Str::of($this->prefix())
            ->finish('/')
            ->append($item->slug)
            ->rtrim('/')
            ->start('/');
    }
}
