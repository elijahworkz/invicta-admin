<?php

namespace Eteacher\InvictaAdmin\Providers;

use Illuminate\Support\ServiceProvider;

class ConsoleServiceProvider extends ServiceProvider
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
            __DIR__.'../Console/stubs/InvictaServiceProvider.stub' => app_path('Providers/InvictaServiceProvider.php'),
        ], 'invicta-provider');

        $this->publishes([
            __DIR__.'/../../config/invicta.php' => config_path('invicta.php'),
        ], 'invicta-config');

        $this->publishes([
            __DIR__.'/../../public/build' => public_path('vendor/invicta'),
        ], 'invicta-assets');

        if (! class_exists('CreateInvictaAuthTables')) {
            // Export migraion
            $this->publishes([
                __DIR__.'/../../database/migrations/invicta_auth_tables.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_invicta_auth_tables.php'),
            ], 'invicta-auth');
        }
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            \Eteacher\InvictaAdmin\Console\InstallCommand::class,
            \Eteacher\InvictaAdmin\Console\PublishCommand::class,
            \Eteacher\InvictaAdmin\Console\AuthPublishCommand::class,
            \Eteacher\InvictaAdmin\Console\MakeSuperAdminCommand::class,
        ]);
    }
}
