<?php

use Eteacher\InvictaAdmin\Http\Middleware\HandleInertiaRequests;

if (config('invicta.enabled')) {
    Route::middleware(['sanctum:auth'])
        ->name('invicta.api.')
        ->prefix(config('invicta.path').'/api')
        ->namespace('Invicta\Http\Controllers\Api')
        ->group(__DIR__.'/api.php');

    Route::middleware([HandleInertiaRequests::class])
        ->name('invicta.')
        ->prefix(config('invicta.path'))
        ->namespace('Invicta\Http\Controllers')
        ->group(__DIR__.'/web.php');
}
