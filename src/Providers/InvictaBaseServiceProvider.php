<?php

namespace Eteacher\InvictaAdmin\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class InvictaBaseServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->authorization();
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
}
