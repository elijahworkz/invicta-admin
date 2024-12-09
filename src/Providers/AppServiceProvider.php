<?php

namespace Elijahworkz\InvictaAdmin\Providers;

use Elijahworkz\InvictaAdmin\Admin\Commands\CommandRegistrar;
use Elijahworkz\InvictaAdmin\Admin\Resources\ResourceRegistrar;
use Elijahworkz\InvictaAdmin\Foundation\Vite;
use Elijahworkz\InvictaAdmin\Http\Middleware\Authorize;
use Elijahworkz\InvictaAdmin\Http\Middleware\Impersonate;
use Elijahworkz\InvictaAdmin\Http\Middleware\Localize;
use Elijahworkz\InvictaAdmin\Http\Middleware\SetAuthGuard;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'./../../config/invicta.php', 'invicta');

        $this->app->singleton(ResourceRegistrar::class, function ($app) {
            return new ResourceRegistrar;
        });

        $this->app->singleton(CommandRegistrar::class, function ($app) {
            return new CommandRegistrar;
        });
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->app->register(ConsoleServiceProvider::class);
        }

        if (config('invicta.enabled')) {
            $this->loadRoutesFrom(__DIR__.'/../../routes/routes.php');

            $this->loadViewsFrom(__DIR__.'/../../resources/views', 'invicta');
        }

        $this->loadRoutesFrom(__DIR__.'/../../routes/sitemap.php');

        $this->registerMiddleware();

        $this->registerBladeDirectives();

        $this->registerMacros();
    }

    protected function registerMiddleware()
    {
        $router = $this->app->make(Router::class);

        $router->middlewareGroup('invicta', [
            'web',
            SetAuthGuard::class,
            Impersonate::class,
            Localize::class,
        ]);

        $router->middlewareGroup('invicta.auth', [
            Authorize::class,
        ]);

        $router->middlewareGroup('invicta.api', [
            'api',
            'auth:sanctum',
            SetAuthGuard::class,
            Impersonate::class,
            Localize::class,
        ]);
    }

    protected function registerBladeDirectives()
    {
        $class = Vite::class;

        Blade::directive('invictaScripts', function ($expression) use ($class) {
            return "<?php echo app('{$class}')(); ?>";
        });

        Blade::directive('invictaAssets', function ($expression) use ($class) {
            return "<?php echo app('{$class}')->assets(); ?>";
        });

        Blade::directive('preloadInvictaScripts', function ($expression) use ($class) {
            return "<?php echo app('{$class}')->preloadScripts(); ?>";
        });
    }

    protected function registerMacros()
    {
        /**
         * Macro for Str::initials
         */
        Stringable::macro('initials', function () {
            $words = explode(' ', trim($this));
            $initials = '';

            if (count($words) > 1) {
                $firstLetter = $words[0][0];
                $lastLetter = $words[count($words) - 1][0];

                $initials = strtoupper($firstLetter.$lastLetter);
            } else {
                // name is single word
                $initials = strtoupper(substr($words[0], 0, 2));
            }

            return new static($initials);
        });

        Str::macro('initials', function (string $string) {
            return (string) (new Stringable($string))->initials();
        });
    }
}
