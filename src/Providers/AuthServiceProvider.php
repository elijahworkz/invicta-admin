<?php

namespace Eteacher\InvictaAdmin\Providers;

use Eteacher\InvictaAdmin\Admin\Resources\Resource;
use Eteacher\InvictaAdmin\Facades\CorePermission;
use Eteacher\InvictaAdmin\Policies\ResourcePolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Resource::class => ResourcePolicy::class,
    ];

    /**
     * Register needed services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        foreach ($this->policies as $key => $policy) {
            Gate::policy($key, $policy);
        }

        Gate::before(function ($user, $ability) {
            return method_exists($user, 'isSuper') && $user->isSuper() ? true : null;
        });

        Gate::after(function ($user, $ability) {
            return method_exists($user, 'hasPermission') && $user->hasPermission($ability) === true ? true : null;
        });

        $this->app->booted(function () {
            CorePermission::boot();
        });

        if (config('invicta.auth.enable_password_reset')) {
            ResetPassword::createUrlUsing(
                function ($notifiable, $token) {
                    return route(
                        'invicta.password.reset',
                        ['token' => $token, 'email' => $notifiable->getEmailForPasswordReset()]
                    );
                }
            );
        }
    }
}
