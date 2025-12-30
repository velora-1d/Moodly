<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Create user in MySQL database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        try {
            $base = preg_replace('/[^a-zA-Z0-9_]/', '_', explode('@', $user->email)[0] ?? 'user');
            $handle = Str::lower($base);
            $exists = DB::table('user_profiles')->where('username', $handle)->exists();
            if ($exists) {
                $handle = $handle . '_' . $user->id;
            }

            DB::table('user_profiles')->updateOrInsert(
                ['user_id' => $user->id],
                [
                    'username' => $handle,
                    'avatar_url' => null,
                    'bio' => null,
                    'day_streak' => 0,
                    'total_xp' => 0,
                    'current_league' => 'Bronze',
                    'league_week' => 1,
                    'top3_finishes' => 0,
                    'followers_count' => 0,
                    'following_count' => 0,
                    'last_active_at' => now(),
                    'settings' => json_encode([]),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            $achievements = DB::table('achievements')->get(['id']);
            if ($achievements->count() > 0) {
                $rows = [];
                foreach ($achievements as $a) {
                    $rows[] = [
                        'user_id' => $user->id,
                        'achievement_id' => $a->id,
                        'progress' => 0,
                        'status' => 'in_progress',
                        'metadata' => null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                DB::table('user_achievements')->upsert($rows, ['user_id', 'achievement_id']);
            }
        } catch (\Throwable $e) {
            // silently ignore bootstrap errors to not block registration
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
