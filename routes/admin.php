<?php

use Eteacher\InvictaAdmin\Http\Controllers\ResourceController;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::controller(ResourceController::class)->group(function () {
    Route::get('/', 'home')->name('home');

    Route::get('/resource/{resource}', 'index');
    Route::get('/resource/{resource}/create', 'create');
    Route::post('/resource/{resource}', 'store');
    Route::get('/resource/{resource}/{item}', 'edit');
    Route::post('/resource/{resource}/{item}', 'update');
    Route::delete('/resource/{resource}/{item}', 'destroy');

    Route::get('/test', function (Request $request) {
        return Inertia::render('Student');
    })->name('test');
});
