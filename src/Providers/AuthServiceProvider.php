<?php

namespace Elijahworkz\InvictaAdmin\Providers;

use Elijahworkz\InvictaAdmin\Admin\Permissions\CorePermissions;
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
    public function register() {}

    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        Gate::before(function ($user, $ability) {
            return method_exists($user, 'isDev') && $user->isDev() ? true : null;
        });

        Gate::after(function ($user, $ability) {
            return method_exists($user, 'hasPermission') && $user->hasPermission($ability) === true ? true : null;
        });

        $this->app->booted(function () {
            CorePermissions::boot();
        });

        if (config('invicta.auth.enable_password_reset')) {
            if (request()->is(trim(config('invicta.path'), '/').'/*')) {
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
}
