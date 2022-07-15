<?php

use Eteacher\InvictaAdmin\Http\Controllers\Api\ResourceController;

Route::get('/invicta', function () {
    return 'hey I can see you';
});

Route::controller(ResourceController::class)->name('resource.')->prefix('resource')->group(function () {
    Route::get('/{resource}/filters', 'filters');
    Route::get('/{resource}/actions', 'actions');
});
