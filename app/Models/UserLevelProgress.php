<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLevelProgress extends Model
{
    protected $table = 'user_level_progress'; // Explicit table name

    protected $fillable = [
        'user_id',
        'level_id',
        'status',
        'xp_earned',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'xp_earned' => 'integer',
        'level_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
