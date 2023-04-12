<?php

use Eteacher\InvictaAdmin\Http\Controllers\AdminController;
use Eteacher\InvictaAdmin\Http\Controllers\Auth\LoginController;

Route::get('sitemap/{resource}.xml', [AdminController::class, 'subSitemap'])->name('subSitemap');
Route::get('sitemap.xml', [AdminController::class, 'sitemap'])->name('sitemap');

Route::middleware(['invicta'])
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
Route::middleware(['api', 'auth:sanctum'])
    ->name('invicta.api.')
    ->prefix(config('invicta.path').'/api')
    ->group(__DIR__.'/api.php');
