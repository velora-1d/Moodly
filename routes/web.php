<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Missions (halaman misi / gamifikasi)
    Route::get('missions', function () {
        return Inertia::render('missions/index');
    })->name('missions');

    // Profile user
    Route::get('profile', function () {
        return Inertia::render('profile/index');
    })->name('profile');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
