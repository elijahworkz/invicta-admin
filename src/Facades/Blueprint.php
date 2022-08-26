<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Resources\BlueprintFactory;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Resources\BlueprintFactory
 */
class Blueprint extends Facade
{
    protected static function getFacadeAccessor()
    {
        return BlueprintFactory::class;
    }
}
