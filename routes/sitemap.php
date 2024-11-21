<?php

use Elijahworkz\InvictaAdmin\Http\Controllers\AdminController;

Route::get('sitemap/{resource}.xml', [AdminController::class, 'subSitemap'])->name('subSitemap');
Route::get('sitemap.xml', [AdminController::class, 'sitemap'])->name('sitemap');
