<?php

use Eteacher\InvictaAdmin\Http\Controllers\PermissionController;
use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::controller(ResourceController::class)->name('resource.')->group(function () {
    Route::get('/', 'home')->name('home');

    Route::get('/resource/{resource}', 'index')->name('index');
    Route::get('/resource/{resource}/create', 'create')->name('create');
    Route::post('/resource/{resource}', 'store')->name('store');
    Route::get('/resource/{resource}/{item}', 'edit')->name('edit');
    Route::post('/resource/{resource}/{item}', 'update')->name('update');
    Route::delete('/resource/{resource}/{item}', 'destroy')->name('destroy');

    Route::get('/test', function (Request $request) {
        return Inertia::render('Student');
    })->name('test');
});

Route::controller(PermissionController::class)->name('permission.')->group(function () {
    Route::get('/group/{group}/permission', 'edit')->name('edit');
    Route::post('/group/{group}/permission', 'update')->name('update');
});
