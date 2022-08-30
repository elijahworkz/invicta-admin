<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Languages\Languages;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Languages\Language
 */
class Language extends Facade
{
    protected static function getFacadeAccessor()
    {
        return Languages::class;
    }
}
