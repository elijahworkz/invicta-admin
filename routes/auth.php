<?php

use Elijahworkz\InvictaAdmin\Http\Controllers\Auth\LoginController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Auth\NewPasswordController;
use Elijahworkz\InvictaAdmin\Http\Controllers\Auth\PasswordResetController;

Route::get('login', [LoginController::class, 'create'])->name('login');
Route::post('login', [LoginController::class, 'store']);

if (config('invicta.auth.enable_password_reset')) {
    Route::get('forgot-password', [PasswordResetController::class, 'create'])->name('password.forgot');
    Route::post('forgot-password', [PasswordResetController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.update');
}
