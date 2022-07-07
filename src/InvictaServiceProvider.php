<?php

namespace Eteacher\InvictaAdmin;

use Eteacher\InvictaAdmin\Providers\AppServiceProvider;
use Eteacher\InvictaAdmin\Providers\ConsoleServiceProvider;
use Illuminate\Support\AggregateServiceProvider;

class InvictaServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        AppServiceProvider::class,
        ConsoleServiceProvider::class,
    ];
}
