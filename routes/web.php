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

    Route::get('missions', function () {
        return Inertia::render('missions/index');
    })->name('missions');

    Route::get('mentoring', function () {
        return Inertia::render('mentoring/index');
    })->name('mentoring');

    Route::get('profile', function () {
        return Inertia::render('profile/index');
    })->name('profile');

    Route::get('shop', function () {
        return Inertia::render('shop/index');
    })->name('shop');

    Route::get('leaderboard', function () {
        return Inertia::render('leaderboard/index');
    })->name('leaderboard');
    
    Route::get('mental-health-chat', function () {
        return Inertia::render('mental-health-chat/index');
    })->name('mental-health-chat');
    
    // Mental Health Chat API route
    Route::post('/api/mental-health-chat', [App\Http\Controllers\MentalHealthChatController::class, 'chat'])
        ->name('api.mental-health-chat');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
