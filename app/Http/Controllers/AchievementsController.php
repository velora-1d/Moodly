<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AchievementsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login');
        }

        // Fetch all achievements, joining with user progress
        // We use leftJoin to get ALL achievements, even ones the user hasn't started
        $achievements = DB::table('achievements')
            ->leftJoin('user_achievements', function($join) use ($user) {
                $join->on('achievements.id', '=', 'user_achievements.achievement_id')
                     ->where('user_achievements.user_id', '=', $user->id);
            })
            ->select([
                'achievements.id',
                'achievements.title',
                'achievements.description',
                'achievements.goal as total',
                'achievements.icon_url as icon_name', 
                'achievements.gradient',
                'user_achievements.progress',
                'user_achievements.status',
                'user_achievements.unlocked_at as completed_at'
            ])
            ->orderBy('achievements.id')
            ->get()
            ->map(function ($row) {
                return [
                    'id' => $row->id,
                    'title' => $row->title,
                    'description' => $row->description,
                    'total' => (int) $row->total,
                    'progress' => (int) ($row->progress ?? 0),
                    'status' => $row->status ?? 'locked', // locked, in_progress, completed
                    'gradient' => $row->gradient ?? 'from-gray-400 to-gray-500',
                    'is_completed' => ($row->status === 'completed'),
                    'percentage' => $row->total > 0 ? min(100, round((($row->progress ?? 0) / $row->total) * 100)) : 0,
                ];
            });

        return Inertia::render('achievements/index', [
            'achievements' => $achievements,
        ]);
    }
}
