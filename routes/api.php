<?php

use Eteacher\InvictaAdmin\Http\Controllers\Api\ModelsController;
use Eteacher\InvictaAdmin\Http\Controllers\Api\ResourceController;

Route::get('/invicta', function () {
    return 'hey I can see you';
});

Route::controller(ResourceController::class)->name('resource.')->prefix('resource')->group(function () {
    Route::get('/{resource}', 'index');
    Route::get('/{resource}/create', 'create');
    Route::get('/{resource}/filters', 'filters');
    Route::get('/{resource}/actions', 'actions');
    Route::get('/{resource}/items', 'items');
    Route::get('/{resource}/relationship/{related}', 'related');
    Route::get('/{resource}/{item}', 'edit');
});

// Route::controller(ModelsController::class)->name('fields.')->prefix('models')->group(function () {
//     Route::get('/', 'list');
//     Route::get('/create', 'create');
//     Route::get('/edit/{model}', 'edit');
// });
