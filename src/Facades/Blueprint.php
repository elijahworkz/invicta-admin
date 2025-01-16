<?php

namespace Elijahworkz\InvictaAdmin\Facades;

use Elijahworkz\InvictaAdmin\Admin\Blueprints\BlueprintFactory;
use Illuminate\Support\Facades\Facade;

/**
 * @see \Elijahworkz\InvictaAdmin\Admin\Blueprints\BlueprintFactory
 */
class Blueprint extends Facade
{
    protected static function getFacadeAccessor()
    {
        return BlueprintFactory::class;
    }
}
