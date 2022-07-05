<?php

use Eteacher\InvictaAdmin\Http\Controllers\Auth\LoginController;

if (config('invicta.enabled')) {
    Route::middleware(['invicta'])
        ->name('invicta.')
        ->prefix(config('invicta.path'))
        ->namespace('Invicta\Http\Controllers')
        ->group(function () {

            // Authorization routess
            if (config('invicta.auth.enable_login_form')) {
                Route::middleware(['guest:invicta'])
                    ->prefix('auth')
                    ->namespace('Auth')
                    ->group(__DIR__.'/auth.php');

                Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
            }

            // Application routes
            Route::middleware('invicta.auth')
                ->group(__DIR__.'/admin.php');
        });

    Route::middleware(['sanctum:auth'])
        ->name('invicta.api.')
        ->prefix(config('invicta.path').'/api')
        ->namespace('Invicta\Http\Controllers\Api')
        ->group(__DIR__.'/api.php');
}
