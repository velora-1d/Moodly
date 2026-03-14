<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'avatar_url',
        'bio',
        'status',
        'day_streak',
        'total_xp',
        'current_league',
        'league_week',
        'top3_finishes',
        'followers_count',
        'following_count',
        'last_active_at',
        'settings',
    ];

    protected $casts = [
        'settings' => 'json',
        'last_active_at' => 'datetime',
        'total_xp' => 'integer',
        'day_streak' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Record user activity and update streak accordingly.
     */
    public function recordActivity()
    {
        $today = \Carbon\Carbon::today();
        $lastActive = $this->last_active_at ? \Carbon\Carbon::parse($this->last_active_at)->startOfDay() : null;

        if (!$lastActive) {
            $this->day_streak = 1;
        } elseif ($lastActive->copy()->addDay()->equalTo($today)) {
            $this->day_streak += 1;
        } elseif ($lastActive->lessThan($today)) {
            $this->day_streak = 1;
        }
        // If already active today, streak stays the same

        $this->last_active_at = now();
        $this->save();
    }
}
