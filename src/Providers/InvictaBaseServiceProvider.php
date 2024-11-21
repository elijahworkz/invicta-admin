<?php

namespace Elijahworkz\InvictaAdmin\Providers;

use Elijahworkz\InvictaAdmin\Listeners\SetLastLoginTimestamp;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class InvictaBaseServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Login::class => [
            SetLastLoginTimestamp::class,
        ],
    ];

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->bootEvents();
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register() {}

    /**
     * Boot all custom Event listeners.
     *
     * @return void
     */
    public function bootEvents()
    {
        foreach ($this->listen as $event => $listeners) {
            foreach ($listeners as $listener) {
                Event::listen($event, $listener);
            }
        }
    }
}
