<?php

use Eteacher\InvictaAdmin\Http\Controllers\AdminController;
use Eteacher\InvictaAdmin\Http\Controllers\AssetController;
use Eteacher\InvictaAdmin\Http\Controllers\NavigationController;
use Eteacher\InvictaAdmin\Http\Controllers\PermissionController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;

Route::controller(AdminController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/impersonate/leave', 'impersonateLeave')->name('impersonate-leave');
    Route::get('/test', function () {
        return inertia('Student');
    });
});

Route::controller(ResourceController::class)->name('resource.')->prefix('/resource/')->group(function () {
    Route::get('{resource}', 'index')->name('index');
    Route::delete('{resource}', 'destroy')->name('destroy');
    Route::get('{resource}/create', 'create')->name('create');
    Route::get('{resource}/reorder', 'reorder')->name('reorder');
    Route::post('{resource}/reorder', 'reorderUpdate');
    Route::post('{resource}', 'store')->name('store');
    Route::get('{resource}/{item}', 'edit')->name('edit');
    Route::post('{resource}/{item}', 'update')->name('update');
});

Route::controller(NavigationController::class)->name('nav.')->prefix('/navigation/')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store');
    Route::get('/{menu}', 'edit')->name('edit');
    Route::post('/{menu}', 'update')->name('update');
    Route::delete('/{menu}', 'destroy')->name('destroy');
    Route::get('/{menu}/items', 'editItems')->name('editItems');
    Route::post('/{menu}/items', 'updateItems')->name('updateItems');
});

Route::controller(AssetController::class)->name('assets.')->prefix('/assets/')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::delete('/', 'destroy')->name('destroy');
});

Route::controller(PermissionController::class)->name('permission.')->prefix('/group/')->group(function () {
    Route::get('{group}/permission', 'edit')->name('edit');
    Route::post('{group}/permission', 'update')->name('update');
});
