<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserLevelProgress;

class LevelController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $levels = [1, 2, 3, 4, 5, 6]; 
        $data = [];

        foreach ($levels as $lvl) {
            $record = UserLevelProgress::firstOrCreate(
                ['user_id' => $user->id, 'level_id' => $lvl],
                ['status' => $lvl === 1 ? 'active' : 'locked']
            );
            $data[] = $record;
        }

        return response()->json($data);
    }

    public function update(Request $request, $levelId)
    {
        $user = $request->user();
        $record = UserLevelProgress::where('user_id', $user->id)
            ->where('level_id', $levelId)
            ->firstOrFail();

        $wasAlreadyCompleted = $record->status === 'completed';

        $record->update([
            'status' => $request->input('status'),
            'completed_at' => $request->input('status') === 'completed' ? now() : null,
        ]);

        // If completed for the first time, award XP and unlock next level
        if ($request->input('status') === 'completed' && !$wasAlreadyCompleted) {
            $metadata = $request->input('metadata', []);
            $stars = $metadata['stars'] ?? 0;
            $bestStreak = $metadata['bestStreak'] ?? 0;

            // Award XP calculation: dynamic based on performance
            $baseXp = 50;
            $starBonus = $stars * 10;
            $streakBonus = $bestStreak * 2;
            $xpToAdd = $baseXp + $starBonus + $streakBonus;

            // Update xp_earned in the level record
            $record->update(['xp_earned' => $xpToAdd]);

            $profile = $user->profile()->firstOrCreate(
                ['user_id' => $user->id],
                ['username' => $user->name . '_' . $user->id]
            );

            // 1. Update Streak and Activity
            $profile->recordActivity();
            
            // 2. Add XP
            $profile->total_xp += $xpToAdd;

            // 3. Update League Logic (Basic Progression)
            $xp = $profile->total_xp;
            $league = 'Bronze';
            if ($xp > 5000) $league = 'Diamond';
            elseif ($xp > 3000) $league = 'Platinum';
            elseif ($xp > 1500) $league = 'Gold';
            elseif ($xp > 500) $league = 'Silver';
            
            $profile->current_league = $league;
            $profile->save();

            // Track XP Event (Adjusted to match migration schema: source, amount, meta, occurred_at)
            \Illuminate\Support\Facades\DB::table('user_xp_events')->insert([
                'user_id' => $user->id,
                'source' => 'level_completed',
                'amount' => $xpToAdd,
                'meta' => json_encode([
                    'level_id' => $levelId,
                    'stars' => $stars,
                    'best_streak' => $bestStreak,
                    'base_xp' => $baseXp,
                    'star_bonus' => $starBonus,
                    'streak_bonus' => $streakBonus
                ]),
                'occurred_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $nextLevel = UserLevelProgress::where('user_id', $user->id)
                ->where('level_id', $levelId + 1)
                ->first();
            
            if ($nextLevel && $nextLevel->status === 'locked') {
                $nextLevel->update(['status' => 'active']);
            }
        }

        return response()->json($record);
    }
}
