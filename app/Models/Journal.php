<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    protected $fillable = [
        'user_id',
        'mood',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
