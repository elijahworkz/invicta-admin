<?php

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', []);
});

Route::get('/resource/{resource}/index', function (Request $request, $resource) {
    return Inertia::render('Resource', ['resource' => $resource]);
});
