<?php

use Eteacher\InvictaAdmin\Http\Controllers\AdminController;
use Eteacher\InvictaAdmin\Http\Controllers\AssetController;
use Eteacher\InvictaAdmin\Http\Controllers\CommandsController;
use Eteacher\InvictaAdmin\Http\Controllers\NavigationController;
use Eteacher\InvictaAdmin\Http\Controllers\PermissionController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Log;

Route::controller(AdminController::class)->group(function () {
    Route::get('impersonate/leave', 'impersonateLeave')->name('impersonate-leave');
});

Route::controller(ResourceController::class)->name('resource.')->prefix('/resource/')->group(function () {
    Route::get('{resource}/actions', 'handleRedirectActions')->name('handle-redirect-actions');
});

Route::get('{path?}', function ($path = null) {
    Log::info('I am here', [$path]);

    return view('invicta::app');
})->where('path', '^((?!api).)*$')->name('home');

// Route::fallback(function () {
//     return view('invicta::app');
// });
// Route::controller(NavigationController::class)->name('nav.')->prefix('/navigation/')->group(function () {
//     Route::get('/', 'index')->name('index');
//     Route::get('create', 'create')->name('create');
//     Route::post('/', 'store');
//     Route::get('{menu}', 'edit')->name('edit');
//     Route::post('{menu}', 'update')->name('update');
//     Route::delete('{menu}', 'destroy')->name('destroy');
//     Route::get('{menu}/items', 'editItems')->name('editItems');
//     Route::post('{menu}/items', 'updateItems')->name('updateItems');
// });

// Route::controller(AssetController::class)->name('assets.')->prefix('/assets/')->group(function () {
//     Route::get('/', 'index')->name('index');
// });

// Route::controller(PermissionController::class)->name('permission.')->prefix('/group/')->group(function () {
//     Route::get('{group}/permission', 'edit')->name('edit');
//     Route::post('{group}/permission', 'update')->name('update');
// });

// /* Admin tools */
// Route::prefix('tools/')->group(function () {
//     Route::controller(CommandsController::class)->name('commands.')->group(function () {
//         Route::get('commands', 'index')->name('index');
//     });
// });
