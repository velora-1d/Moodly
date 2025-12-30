<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserMission;
use Carbon\Carbon;

class MissionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Define daily missions (could be in config or DB)
        $dailyMissions = [
            ['key' => 'gratitude-journal', 'title' => 'Tulis Jurnal Syukur', 'target' => 1, 'xp' => 10],
            ['key' => 'breathing-exercise', 'title' => 'Latihan Pernapasan 2 Menit', 'target' => 1, 'xp' => 15],
            ['key' => 'read-article', 'title' => 'Baca Artikel Mindfulness', 'target' => 1, 'xp' => 10],
        ];

        // Sync with DB
        $missionsData = [];
        foreach ($dailyMissions as $mission) {
            $record = UserMission::where('user_id', $user->id)
                ->where('mission_key', $mission['key'])
                ->whereDate('created_at', Carbon::today())
                ->first();
            
            if (!$record) {
                $record = UserMission::create([
                    'user_id' => $user->id,
                    'mission_key' => $mission['key'],
                    'progress' => 0,
                    'is_completed' => false,
                    'created_at' => Carbon::now(), // Save current time
                ]);
            }

            $missionsData[] = [
                'id' => $record->id,
                'key' => $mission['key'],
                'title' => $mission['title'],
                'target' => $mission['target'],
                'progress' => $record->progress,
                'is_completed' => $record->is_completed,
                'xp_reward' => $mission['xp'],
            ];
        }

        return response()->json($missionsData);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        $mission = UserMission::where('user_id', $user->id)->findOrFail($id);
        
        $wasCompleted = $mission->is_completed;
        $isCompletedNow = $request->input('is_completed', false);

        $mission->update([
            'progress' => $request->input('progress', 1),
            'is_completed' => $isCompletedNow,
            'completed_at' => $isCompletedNow ? now() : null,
        ]);

        // Award XP if newly completed
        if ($isCompletedNow && !$wasCompleted) {
            $dailyMissions = [
                'gratitude-journal' => 10,
                'breathing-exercise' => 15,
                'read-article' => 10,
            ];

            $xpToAdd = $dailyMissions[$mission->mission_key] ?? 0;

            if ($xpToAdd > 0) {
                $profile = $user->profile()->firstOrCreate(
                    ['user_id' => $user->id],
                    ['username' => $user->name . '_' . $user->id] // Default username if not exists
                );
                
                $profile->increment('total_xp', $xpToAdd);
                
                // Track XP Event for history/feed
                \Illuminate\Support\Facades\DB::table('user_xp_events')->insert([
                    'user_id' => $user->id,
                    'amount' => $xpToAdd,
                    'event_type' => 'mission_completed',
                    'description' => 'Selesai misi: ' . $mission->mission_key,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return response()->json($mission);
    }
}
