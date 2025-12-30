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
            // Award XP (e.g., 50 XP per level completion)
            $xpToAdd = 50;
            $profile = $user->profile()->firstOrCreate(
                ['user_id' => $user->id],
                ['username' => $user->name . '_' . $user->id]
            );
            $profile->increment('total_xp', $xpToAdd);

            // Track XP Event
            \Illuminate\Support\Facades\DB::table('user_xp_events')->insert([
                'user_id' => $user->id,
                'amount' => $xpToAdd,
                'event_type' => 'level_completed',
                'description' => 'Selesai Level: ' . $levelId,
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
