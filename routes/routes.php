<?php

use Elijahworkz\InvictaAdmin\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

// API routes
Route::middleware(['invicta.api'])
    ->name('invicta.api.')
    ->prefix(config('invicta.path').'/api')
    ->group(__DIR__.'/api.php');

// Application routes
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
