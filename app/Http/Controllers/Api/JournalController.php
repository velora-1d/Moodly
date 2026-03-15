<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use App\Models\UserMission;
use Carbon\Carbon;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $journals = Journal::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($journal) {
                return [
                    'id' => (string) $journal->id,
                    'content' => $journal->content,
                    'mood' => $journal->mood,
                    'timestamp' => $journal->created_at->timestamp * 1000,
                ];
            });

        return response()->json($journals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'mood' => 'required|string',
        ]);

        $user = $request->user();

        $journal = Journal::create([
            'user_id' => $user->id,
            'content' => $validated['content'],
            'mood' => $validated['mood'],
        ]);

        // Find today's gratitude journal mission
        $mission = UserMission::where('user_id', $user->id)
            ->where('mission_key', 'gratitude-journal')
            ->whereDate('created_at', Carbon::today())
            ->first();

        // Check if mission exists and is not yet completed
        // Target is 1
        if ($mission && !$mission->is_completed) {
            $mission->increment('progress');
        }

        return response()->json([
            'id' => (string) $journal->id,
            'content' => $journal->content,
            'mood' => $journal->mood,
            'timestamp' => $journal->created_at->timestamp * 1000,
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $journal = Journal::where('user_id', $request->user()->id)->findOrFail($id);
        $journal->delete();

        return response()->json(['message' => 'Journal deleted successfully']);
    }
}
