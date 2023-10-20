<?php

use Eteacher\InvictaAdmin\Http\Controllers\Api\AssetController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\FieldsController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\NavigationController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\ResourceController;
use Eteacher\InvictaAdmin\Http\Controllers\CommandsController;

Route::controller(ResourceController::class)
    ->group(function () {
        Route::name('resource.')->prefix('resource')->group(function () {
            Route::get('{resource}', 'index')->name('index');
            Route::post('{resource}', 'store')->name('store');
            Route::delete('{resource}', 'destroy')->name('destroy');
            Route::get('{resource}/create', 'create');
            Route::get('{resource}/filters', 'filters');
            Route::get('{resource}/actions', 'actions');
            Route::get('{resource}/actions/blueprint/{item?}', 'actionBlueprint');
            Route::post('{resource}/actions', 'handleActions')->name('handle-actions');
            Route::get('{resource}/items', 'items');
            Route::get('{resource}/relationship/{related}', 'related');
            Route::get('{resource}/{item}/edit', 'edit');
            Route::get('{resource}/{item}/uri', 'uri');
            Route::get('{resource}/{item}', 'show')->name('show');
            Route::post('{resource}/{item}', 'update')->name('update');
            Route::post('{resource}/{item}/localize/{locale}', 'localize')->name('localize');
        });

        // Route::name('assets.')->prefix('assets')->group(function () {
        //     Route::get('/', 'index')->name('index');
        //     Route::post('/', 'store')->name('store');
        //     Route::delete('/', 'destroy')->name('destroy');
        //     Route::get('actions', 'actions')->name('actions');
        //     Route::get('actions/blueprint/{item?}', 'actionBlueprint');
        //     Route::post('actions', 'handleActions')->name('handle-actions');
        //     Route::get('{item}', 'edit')->name('edit');
        //     Route::post('{item}', 'update')->name('update');
        // });
    });

// Route::controller(AssetController::class)->name('assets.')->prefix('/assets/')->group(function () {
//     Route::get('/', 'index')->name('index');
//     Route::post('/', 'store')->name('store');
//     Route::delete('/', 'destroy')->name('destroy');
//     Route::get('actions/', 'actions')->name('actions');
//     Route::get('actions/blueprint/{item?}', 'actionBlueprint');
//     Route::post('actions', 'handleActions')->name('handle-actions');
//     Route::get('field-actions', 'fieldActions')->name('field-actions');
//     Route::get('{asset}', 'edit')->name('edit');
//     Route::post('{asset}', 'update')->name('update');
// });

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

Route::controller(FieldsController::class)->name('fields.')->prefix('/fields/')->group(function () {
    Route::get('filter/options', 'filterOptions');
    Route::get('texteditor/resources', 'linkableResources');
    Route::get('resource-link/options', 'linkableResourcesOptions');
    Route::get('assets/field-actions', 'assetFieldActions');
});

/* Admin tools */
Route::controller(CommandsController::class)->prefix('commands')->name('commands.')->group(function () {
    Route::get('run/{handle}', 'run')->name('run');
});
