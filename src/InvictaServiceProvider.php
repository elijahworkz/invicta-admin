<?php

namespace Elijahworkz\InvictaAdmin;

use Illuminate\Support\AggregateServiceProvider;

class InvictaServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        \Elijahworkz\InvictaAdmin\Providers\AppServiceProvider::class,
        \Elijahworkz\InvictaAdmin\Providers\AuthServiceProvider::class,
        \Elijahworkz\InvictaAdmin\Providers\EventsServiceProvider::class,
        \Elijahworkz\InvictaAdmin\Providers\BroadcastServiceProvider::class,
    ];
}
