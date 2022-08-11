<?php

use Eteacher\InvictaAdmin\Http\Controllers\Auth\LoginController;

Route::middleware(['invicta'])
    ->name('invicta.')
    ->prefix(config('invicta.path'))
    ->group(function () {
        Route::get('/guest', function (Request $request) {
            dd('fsdfsdf');
        })->name('guest');

        // Authorization routess
        if (config('invicta.auth.enable_login_form')) {
            Route::middleware(['guest:'.config('invicta.auth.guard')])
                ->prefix('auth')
                ->group(__DIR__.'/auth.php');

            Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
        }

        // Application routes
        Route::middleware(['invicta.auth', 'can:viewInvicta'])
            ->group(__DIR__.'/admin.php');
    });

// API routes
Route::middleware(['api', 'auth:sanctum'])
    ->name('invicta.api.')
    ->prefix(config('invicta.path').'/api')
    ->group(__DIR__.'/api.php');
