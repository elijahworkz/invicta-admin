<?php

use Eteacher\InvictaAdmin\Http\Controllers\Api\AssetController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\FieldsController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\ResourceController;
use Eteacher\InvictaAdmin\Http\Controllers\CacheController;

Route::controller(ResourceController::class)->name('resource.')->prefix('resource')->group(function () {
    Route::get('/{resource}', 'index');
    Route::get('/{resource}/create', 'create');
    Route::get('/{resource}/filters', 'filters');
    Route::get('/{resource}/actions', 'actions');
    Route::get('/{resource}/actions/blueprint/{item?}', 'actionBlueprint');
    Route::post('/{resource}/actions', 'handleActions')->name('handle-actions');
    Route::get('/{resource}/items', 'items');
    Route::get('/{resource}/relationship/{related}', 'related');
    Route::get('/{resource}/{item}', 'edit');
    Route::get('/{resource}/{item}/uri', 'uri');
});

Route::controller(AssetController::class)->name('assets.')->prefix('/assets/')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'store')->name('store');
    Route::get('/{asset}', 'edit')->name('edit');
    Route::post('/{asset}', 'update')->name('update');
});

Route::controller(FieldsController::class)->name('fields.')->prefix('/fields/')->group(function () {
    Route::get('/filter/options', 'filterOptions');
    Route::get('/texteditor/resources', 'linkableResources');
    Route::get('/resource-link/options', 'linkableResourcesOptions');
});

//tools
Route::post('cache/clear', [CacheController::class, 'clearCache'])->name('cache.clear');
