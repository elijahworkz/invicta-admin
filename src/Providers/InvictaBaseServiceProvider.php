<?php

namespace Eteacher\InvictaAdmin\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class InvictaBaseServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [];

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->authorization();
        $this->bootEvents();
    }

    protected function authorization()
    {
        $this->gate();
    }

    /**
     * Register main Invicta gate.
     *
     * This gate determines who can access Invicta admin.
     * This methods needs to be changed in the Application according to needs.
     * By default anyone can see admin panel in local.
     *
     * @return void
     */
    protected function gate()
    {
        Gate::define('viewInvicta', function ($user) {
            return app()->environment('local');
        });
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
    }

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
