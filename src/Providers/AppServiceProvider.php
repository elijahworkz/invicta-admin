<?php

namespace Eteacher\InvictaAdmin\Providers;

use Eteacher\InvictaAdmin\Admin\Foundation\Vite;
use Eteacher\InvictaAdmin\Http\Middleware\Authorize;
use Eteacher\InvictaAdmin\Http\Middleware\HandleInertiaRequests;
use Eteacher\InvictaAdmin\Http\Middleware\SetAuthGuard;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'./../../config/invicta.php', 'invicta');
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->app->register(ConsoleServiceProvider::class);
        }

        if (config('invicta.enabled')) {
            $this->loadRoutesFrom(__DIR__.'/../../routes/routes.php');

            $this->loadViewsFrom(__DIR__.'/../../resources/views', 'invicta');

            $this->registerMiddleware();

            $this->registerBladeDirectives();
        }
    }

    protected function registerMiddleware()
    {
        $router = $this->app->make(Router::class);

        $router->middlewareGroup('invicta', [
            'web',
            SetAuthGuard::class,
            HandleInertiaRequests::class,
        ]);

        $router->middlewareGroup('invicta.auth', [
            Authorize::class,
        ]);
    }

    protected function registerBladeDirectives()
    {
        Blade::directive('invictaScripts', function ($expression) {
            $class = Vite::class;

            return "<?php echo app('$class')(); ?>";
        });

        Blade::directive('invictaAssets', function ($expression) {
            $class = Vite::class;

            return "<?php echo app('$class')->assets() ?>";
        });
    }
}
