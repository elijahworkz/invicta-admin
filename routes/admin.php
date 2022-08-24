<?php

use Eteacher\InvictaAdmin\Http\Controllers\PageController;
use Eteacher\InvictaAdmin\Http\Controllers\PermissionController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;

Route::controller(PageController::class)->group(function () {
    Route::get('/', 'home')->name('home');
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

Route::controller(PermissionController::class)->name('permission.')->prefix('/group/')->group(function () {
    Route::get('{group}/permission', 'edit')->name('edit');
    Route::post('{group}/permission', 'update')->name('update');
});
