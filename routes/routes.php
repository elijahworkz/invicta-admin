<?php

use Eteacher\InvictaAdmin\Http\Controllers\Auth\LoginController;

Route::middleware(['invicta', 'throttle'])
    ->name('invicta.')
    ->prefix(config('invicta.path'))
    ->group(function () {
        // Authorization routess
        if (config('invicta.auth.enable_login_form')) {
            Route::middleware(['guest:'.config('invicta.auth.guard')])
                ->prefix('auth')
                ->group(__DIR__.'/auth.php');
        }

        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

        // Application routes
        Route::middleware(['invicta.auth', 'can:access invicta']) //,
            ->group(__DIR__.'/admin.php');
    });

// API routes
Route::middleware(['invicta.api'])
    ->name('invicta.api.')
    ->prefix(config('invicta.path').'/api')
    ->group(__DIR__.'/api.php');

// Webhook routes
Route::middleware(['web', 'throttle'])
    ->name('invicta.webhooks.')
    ->prefix('webhooks')
    ->group(__DIR__.'/webhooks.php');
