<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MoodLog;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $profile = $user->profile()->firstOrCreate(
            ['user_id' => $user->id],
            ['username' => $user->name . '_' . $user->id]
        );

        $moods = MoodLog::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->limit(31) // Get more for the calendar
            ->get()
            ->mapWithKeys(function($m) {
                return [$m->date->format('Y-m-d') => ['emoji' => $m->mood, 'label' => $m->label]];
            });

        // Ensure daily missions exist for today
        $dailyMissionsDefs = [
            ['key' => 'gratitude-journal', 'title' => 'Tulis Jurnal Syukur'],
            ['key' => 'breathing-exercise', 'title' => 'Latihan Pernapasan 2 Menit'],
            ['key' => 'read-article', 'title' => 'Baca Artikel Mindfulness'],
        ];

        foreach ($dailyMissionsDefs as $def) {
             \App\Models\UserMission::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'mission_key' => $def['key'],
                    'created_at' => \Carbon\Carbon::today(),
                ],
                ['progress' => 0, 'is_completed' => false]
            );
        }

        // Get daily mission stats
        $dailyMissions = \App\Models\UserMission::where('user_id', $user->id)
            ->whereDate('created_at', \Carbon\Carbon::today())
            ->get();
        
        $missionsTotal = $dailyMissions->count();
        $missionsCompleted = $dailyMissions->where('is_completed', true)->count();

        return response()->json([
            'stats' => [
                'level' => floor($profile->total_xp / 100) + 1,
                'total_xp' => $profile->total_xp,
                'streak' => $profile->day_streak,
                'league' => $profile->current_league ?? 'Bronze',
                'top3_finishes' => $profile->top3_finishes ?? 0,
                'badges' => 12, // Still mock for now
            ],
            'moodHistory' => $moods,
            'dailyXP' => $profile->total_xp % 100, // XP toward next level today? Or just some value
            'missionsTotal' => $missionsTotal,
            'missionsCompleted' => $missionsCompleted,
        ]);
    }

    public function storeMood(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'mood' => 'required|string',
            'label' => 'nullable|string',
        ]);

        $log = MoodLog::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'date' => $validated['date']
            ],
            [
                'mood' => $validated['mood'],
                'label' => $validated['label']
            ]
        );

        return response()->json($log);
    }
}
