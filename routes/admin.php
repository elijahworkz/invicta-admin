<?php

use Eteacher\InvictaAdmin\Http\Controllers\AdminController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;

Route::controller(AdminController::class)->group(function () {
    Route::get('impersonate/leave', 'impersonateLeave')->name('impersonate-leave');
});

Route::controller(ResourceController::class)->name('resource.')->prefix('/resource/')->group(function () {
    Route::get('{resource}/actions', 'handleRedirectActions')->name('handle-redirect-actions');
});

// Main SPA route
Route::get('{path?}', function ($path = null) {
    return view('invicta::app');
})->where('path', '^((?!api).)*$')->name('home');
