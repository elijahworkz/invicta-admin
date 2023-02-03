<?php

namespace Eteacher\InvictaAdmin;

use Illuminate\Support\AggregateServiceProvider;

class InvictaServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        \Eteacher\InvictaAdmin\Providers\AppServiceProvider::class,
        \Eteacher\InvictaAdmin\Providers\AuthServiceProvider::class,
        \Eteacher\InvictaAdmin\Providers\EventsServiceProvider::class,
        \Eteacher\InvictaAdmin\Providers\BroadcastServiceProvider::class,
    ];
}
