<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing/index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('missions', function () {
        return Inertia::render('missions/index');
    })->name('missions');

    Route::get('mentoring', function () {
        return Inertia::render('mentoring/index');
    })->name('mentoring');

    // Tambah rute GET untuk halaman Gamifikasi Alchemist (Inertia)
    Route::get('gamifikasi/alchemist', function () {
        return Inertia::render('gamifikasi/alchemist');
    })->name('gamifikasi.alchemist');

    Route::get('profile', function () {
        return Inertia::render('profile/index');
    })->name('profile');

    Route::get('shop', function () {
        return Inertia::render('shop/index');
    })->name('shop');

    Route::get('leaderboard', function () {
        return Inertia::render('leaderboard/index');
    })->name('leaderboard');
<<<<<<< HEAD
=======

    // Mood tracker endpoints
    Route::get('moods', [\App\Http\Controllers\MoodController::class, 'index'])->name('moods.index');
    Route::post('moods', [\App\Http\Controllers\MoodController::class, 'store'])->name('moods.store');
    
>>>>>>> 06c0e6a4146661cb4ef47c0f93ffd9543794a832
    Route::get('mental-health-chat', function () {
        return Inertia::render('mental-health-chat/index');
    })->name('mental-health-chat');
    
    // Mental Health Chat API route
    Route::post('/api/mental-health-chat', [App\Http\Controllers\MentalHealthChatController::class, 'chat'])
        ->name('api.mental-health-chat');

    // Alchemist API endpoints (v1 minimal)
    Route::post('alchemist/mix', [\App\Http\Controllers\AlchemistController::class, 'mix'])->name('alchemist.mix');
    Route::post('alchemist/finish', [\App\Http\Controllers\AlchemistController::class, 'finish'])->name('alchemist.finish');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
