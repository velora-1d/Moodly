<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

use App\Models\UserProfile;
use App\Models\User;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        // For now we only support 'lifetime' period locally in user_profiles
        // In the future, we can use user_xp_events for 'month' or 'week' filters
        
        $profiles = UserProfile::with('user')
            ->orderBy('total_xp', 'desc')
            ->limit(100)
            ->get();

        $rows = $profiles->map(function ($profile) {
            return [
                'user_id' => (string)$profile->user_id,
                'name' => $profile->user ? $profile->user->name : ($profile->username ?? 'User ' . $profile->user_id),
                'total_xp' => (int)$profile->total_xp,
                'status' => $profile->status,
            ];
        });

        return response()->json(['ok' => true, 'data' => $rows]);
    }

    public function storeStatus(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['ok' => false, 'error' => 'Unauthorized'], 401);
        }

        $status = (string)($request->input('status') ?? '');
        if ($status === '') {
            return response()->json(['ok' => false, 'error' => 'Missing status'], 422);
        }

        $profile = $user->profile()->firstOrCreate(
            ['user_id' => $user->id],
            ['username' => $user->name . '_' . $user->id]
        );
        
        $profile->update(['status' => $status]);

        return response()->json(['ok' => true]);
    }
}
