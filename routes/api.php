<?php

use Elijahworkz\InvictaAdmin\Http\Controllers\Api\AssetController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\CommandsController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\FieldsController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\NavigationController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\PermissionController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\ResourceController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Api\SettingsController;
use Illuminate\Support\Facades\Route;

Route::post('assets', [AssetController::class, 'store']);

Route::controller(SettingsController::class)
    ->name('settings.')
    ->prefix('settings')
    ->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::post('/', 'update')->name('update');
    });

Route::controller(ResourceController::class)
    ->name('resource.')
    ->prefix('resource')
    ->group(function () {
        Route::get('{resource}', 'index')->name('index');
        Route::post('{resource}', 'store')->name('store');
        Route::delete('{resource}', 'destroy')->name('destroy');
        Route::get('{resource}/create', 'create');
        Route::get('{resource}/filters', 'filters');
        Route::get('{resource}/actions', 'actions');
        Route::get('{resource}/actions/blueprint/{item?}', 'actionBlueprint');
        Route::post('{resource}/actions', 'handleActions')->name('handle-actions');
        Route::get('{resource}/items', 'items');
        Route::get('{resource}/relationship/{related}', 'relationship');
        Route::get('{resource}/{item}/edit', 'edit');
        Route::get('{resource}/{item}/uri', 'uri');
        Route::get('{resource}/{item}/relationship/{related}', 'related');
        Route::get('{resource}/{item}', 'show')->name('show');
        Route::post('{resource}/{item}', 'update')->name('update');
        Route::post('{resource}/{item}/localize/{locale}', 'localize')->name('localize');
    });

Route::controller(NavigationController::class)
    ->name('nav.')
    ->prefix('/navigation/')
    ->group(function () {
        Route::get('{menu}/items', 'editItems')->name('editItems');
        Route::post('{menu}/items', 'updateItems')->name('updateItems');
        Route::post('{menu}/localize/{locale}', 'localize')->name('localize');
    });

Route::controller(FieldsController::class)
    ->name('fields.')
    ->prefix('/fields/')
    ->group(function () {
        Route::get('filter/options', 'filterOptions');
        Route::get('texteditor/resources', 'linkableResources');
        Route::get('resource-link/options', 'linkableResourcesOptions');
        Route::get('assets/field-actions', 'assetFieldActions');
    });

Route::controller(PermissionController::class)
    ->name('permission.')
    ->prefix('/group/')
    ->group(function () {
        Route::get('{group}/permissions', 'edit')->name('edit');
        Route::post('{group}/permissions', 'update')->name('update');
    });

/* Admin tools */
Route::prefix('tools/')->group(function () {
    Route::controller(CommandsController::class)->name('commands.')->group(function () {
        Route::get('commands', 'index')->name('index');
        Route::get('commands/run/{handle}', 'run')->name('run');
    });
});
