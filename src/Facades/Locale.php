<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Locales\Locales;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Locales\Locales
 */
class Locale extends Facade
{
    protected static function getFacadeAccessor()
    {
        return Locales::class;
    }
}
