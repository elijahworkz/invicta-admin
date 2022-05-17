<?php
namespace Eteacher\InvictaAdmin;

use Illuminate\Support\ServiceProvider;

class InvictaAdminServiceProvider extends ServiceProvider
{

	public function register()
	{
		if (! $this->app->configurationIsCached()) {
			$this->mergeConfigFrom(__DIR__.'./../config/config.php', 'invicta');
		}
	}

	public function boot()
	{
		$this->loadRoutesFrom(__DIR__.'/../routes/routes.php');

		$this->loadViewsFrom(__DIR__.'/../resources/views', 'invicta');

		$this->publishes([
				__DIR__.'/../config/config.php' => config_path('invicta.php'),
			], 'invicta-config');
	}
}