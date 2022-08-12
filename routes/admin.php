<?php

use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::controller(ResourceController::class)->group(function () {
    Route::get('/', 'home')->name('home');

    Route::get('/resource/{resource}', 'index')->name('resource');
    Route::get('/resource/{resource}/create', 'create')->name('resource.create');
    Route::post('/resource/{resource}', 'store')->name('resource.store');
    Route::get('/resource/{resource}/{item}', 'edit')->name('resource.edit');
    Route::post('/resource/{resource}/{item}', 'update')->name('resource.update');
    Route::delete('/resource/{resource}/{item}', 'destroy')->name('resource.destroy');

    Route::get('/test', function (Request $request) {
        return Inertia::render('Student');
    })->name('test');
});
