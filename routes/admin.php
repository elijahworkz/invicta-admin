<?php

use Eteacher\InvictaAdmin\Http\Controllers\AdminController;
use Eteacher\InvictaAdmin\Http\Controllers\AssetController;
use Eteacher\InvictaAdmin\Http\Controllers\CommandsController;
use Eteacher\InvictaAdmin\Http\Controllers\DeploymentController;
use Eteacher\InvictaAdmin\Http\Controllers\NavigationController;
use Eteacher\InvictaAdmin\Http\Controllers\PermissionController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;

Route::controller(AdminController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('impersonate/leave', 'impersonateLeave')->name('impersonate-leave');
});

Route::controller(ResourceController::class)->name('resource.')->prefix('/resource/')->group(function () {
    Route::get('{resource}/actions', 'handleRedirectActions')->name('handle-redirect-actions');
    Route::get('{resource}', 'index')->name('index');
    Route::get('{resource}/create', 'create')->name('create');
    Route::get('{resource}/reorder', 'reorder')->name('reorder');
    Route::post('{resource}/reorder', 'reorderUpdate');
    Route::post('{resource}', 'store')->name('store');
    Route::get('{resource}/{item}', 'show')->name('show');
    Route::get('{resource}/{item}/edit', 'edit')->name('edit');
    Route::post('{resource}/{item}', 'update')->name('update');
    Route::get('{resource}/{item}/localize/{locale}', 'localize')->name('localize');
});

Route::controller(NavigationController::class)->name('nav.')->prefix('/navigation/')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('create', 'create')->name('create');
    Route::post('/', 'store');
    Route::get('{menu}', 'edit')->name('edit');
    Route::post('{menu}', 'update')->name('update');
    Route::delete('{menu}', 'destroy')->name('destroy');
    Route::get('{menu}/items', 'editItems')->name('editItems');
    Route::post('{menu}/items', 'updateItems')->name('updateItems');
});

Route::controller(AssetController::class)->name('assets.')->prefix('/assets/')->group(function () {
    Route::get('/', 'index')->name('index');
});

Route::controller(PermissionController::class)->name('permission.')->prefix('/group/')->group(function () {
    Route::get('{group}/permission', 'edit')->name('edit');
    Route::post('{group}/permission', 'update')->name('update');
});

/* Admin tools */
Route::prefix('tools/')->group(function () {

    Route::controller(DeploymentController::class)->name('deploy.')->group(function () {
        Route::get('deploy', 'index')->name('index');
        Route::post('deploy', 'deploy')->name('start');
        Route::delete('deploy', 'destroy')->name('destroy');
    });

    Route::controller(CommandsController::class)->name('commands.')->group(function () {
        Route::get('commands', 'index')->name('index');
    });
});
