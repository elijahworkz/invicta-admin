<?php

namespace Eteacher\InvictaAdmin;

use Illuminate\Support\ServiceProvider;

class InvictaServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->registerPublishing();
        }
    }

    /**
     * Register the package's publishable resources.
     *
     * @return void
     */
    protected function registerPublishing()
    {
        $this->publishes([
            __DIR__.'/Console/stubs/InvictaServiceProvider.stub' => app_path('Providers/InvictaServiceProvider.php'),
        ], 'invicta-provider');

        $this->publishes([
            __DIR__.'/../config/invicta.php' => config_path('invicta.php'),
        ], 'invicta-config');
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            Console\InstallCommand::class,
        ]);
    }
}
