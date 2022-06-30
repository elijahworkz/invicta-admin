<?php

namespace Eteacher\InvictaAdmin;

use Illuminate\Support\ServiceProvider as LaravelServiceProvider;

class ServiceProvider extends LaravelServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'./../config/invicta.php', 'invicta');
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->app->register(InvictaServiceProvider::class);
        }

        $this->loadRoutesFrom(__DIR__.'/../routes/routes.php');

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'invicta');
    }
}
