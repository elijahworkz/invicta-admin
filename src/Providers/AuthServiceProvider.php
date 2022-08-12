<?php

namespace Eteacher\InvictaAdmin\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
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
        Gate::before(function ($user, $ability) {
            return method_exists($user, 'isSuper') && $user->isSuper() ? true : null;
        });

        Gate::after(function ($user, $ability) {
            return method_exists($user, 'hasPermission') ?? $user->hasPermission($ability) === true ? true : null;
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
