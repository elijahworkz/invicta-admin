<?php

use Eteacher\InvictaAdmin\Http\Controllers\Api\ResourceController;

Route::controller(ResourceController::class)->name('resource.')->prefix('resource')->group(function () {
    Route::get('/{resource}', 'index');
    Route::get('/{resource}/create', 'create');
    Route::get('/{resource}/filters', 'filters');
    Route::get('/{resource}/actions', 'actions');
    Route::post('/{resource}/actions', 'handleActions');
    Route::get('/{resource}/items', 'items');
    Route::get('/{resource}/relationship/{related}', 'related');
    Route::get('/{resource}/{item}', 'edit');
    Route::get('/{resource}/{item}/uri', 'uri');
});
