<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // User Missions Table
        Schema::create('user_missions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('mission_key'); // active-listening, gratitude-journal, etc.
            $table->integer('progress')->default(0);
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            $table->unique(['user_id', 'mission_key', 'created_at']); // Optional: allow repeating missions daily? 
            // For simplicity, let's just index user_id
            $table->index(['user_id', 'created_at']);
        });

        // User Level Progress Table
        Schema::create('user_level_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('level_id');
            $table->string('status')->default('locked'); // locked, active, completed
            $table->integer('xp_earned')->default(0);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'level_id']);
        });

        // Chat Sessions Table
        Schema::create('chat_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->default('New Chat');
            $table->boolean('is_archived')->default(false);
            $table->timestamps();
        });

        // Chat Messages Table
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('chat_sessions')->cascadeOnDelete();
            $table->enum('role', ['user', 'assistant', 'system']);
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chat_sessions');
        Schema::dropIfExists('user_level_progress');
        Schema::dropIfExists('user_missions');
    }
};
