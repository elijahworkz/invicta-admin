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
            __DIR__.'/../Console/stubs/InvictaServiceProvider.stub.php' => app_path('Providers/InvictaServiceProvider.php'),
        ], 'invicta-provider');

        $this->publishes([
            __DIR__.'/../../config/invicta.php' => config_path('invicta.php'),
        ], 'invicta-config');

        $this->publishes([
            __DIR__.'/../../public/vendor' => public_path('vendor'),
        ], 'invicta-assets');

        if (! class_exists('CreateInvictaAuthTables')) {
            // Export migraion
            $this->publishes([
                __DIR__.'/../../database/migrations/invicta_auth_tables.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_invicta_auth_tables.php'),
            ], 'invicta-auth');
        }

        if (! class_exists('CreateInvictaNavTable')) {
            $this->publishes([
                __DIR__.'/../../database/migrations/invicta_nav_table.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_invicta_nav_table.php'),
            ], 'invicta-nav');
        }

        if (! class_exists('CreateInvictaGlobalSettingsTable')) {
            $this->publishes([
                __DIR__.'/../../database/migrations/invicta_global_settings_table.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_invicta_global_settings_table.php'),
            ], 'invicta-global');
        }

        if (! class_exists('CreateInvictaAssetsTable')) {
            $this->publishes([
                __DIR__.'/../../database/migrations/invicta_assets_table.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_create_invicta_assets_table.php'),
            ], 'invicta-assets');
        }

        if (! class_exists('GlobalSettingSeeder')) {
            $this->publishes([
                __DIR__.'/../../database/seeders/global_setting_seeder.php.stub' => database_path('seeders/GlobalSettingSeeder.php'),
            ], 'invicta-global-seo');
        }

        $this->publishes([
            __DIR__.'/../../resources/views/sitemap' => public_path('vendor/invicta/views/sitemap'),
        ], 'invicta-sitemap');
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
            \Eteacher\InvictaAdmin\Console\NavPublishCommand::class,
            \Eteacher\InvictaAdmin\Console\AssetsPublishCommand::class,
            \Eteacher\InvictaAdmin\Console\MakeSuperAdminCommand::class,
            \Eteacher\InvictaAdmin\Console\ResourceCommand::class,
            \Eteacher\InvictaAdmin\Console\ActionCommand::class,
            \Eteacher\InvictaAdmin\Console\FilterCommand::class,
            \Eteacher\InvictaAdmin\Console\GlobalSettingPublishCommand::class,
        ]);
    }
}
