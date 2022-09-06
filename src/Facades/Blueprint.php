<?php

namespace Eteacher\InvictaAdmin\Facades;

use Eteacher\InvictaAdmin\Admin\Blueprints\BlueprintFactory;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Eteacher\InvictaAdmin\Admin\Blueprints\BlueprintFactory
 */
class Blueprint extends Facade
{
    protected static function getFacadeAccessor()
    {
        return BlueprintFactory::class;
    }
}
