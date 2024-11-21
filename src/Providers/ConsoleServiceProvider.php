<?php

namespace Elijahworkz\InvictaAdmin\Providers;

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
        ], 'public-assets');

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

        $this->publishes([
            __DIR__.'/../../database/migrations/invicta_update_users_with_2fa.php.stub' => database_path('migrations/'.date('Y_m_d_His', time()).'_update_users_with_2fa.php'),
        ], 'invicta-2fa');
    }

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
        $this->commands([
            \Elijahworkz\InvictaAdmin\Console\InstallCommand::class,
            \Elijahworkz\InvictaAdmin\Console\PublishCommand::class,
            \Elijahworkz\InvictaAdmin\Console\AuthPublishCommand::class,
            \Elijahworkz\InvictaAdmin\Console\NavPublishCommand::class,
            \Elijahworkz\InvictaAdmin\Console\AssetsPublishCommand::class,
            \Elijahworkz\InvictaAdmin\Console\MakeSuperAdminCommand::class,
            \Elijahworkz\InvictaAdmin\Console\ResourceCommand::class,
            \Elijahworkz\InvictaAdmin\Console\ActionCommand::class,
            \Elijahworkz\InvictaAdmin\Console\FilterCommand::class,
            \Elijahworkz\InvictaAdmin\Console\GlobalSettingPublishCommand::class,
        ]);
    }
}
