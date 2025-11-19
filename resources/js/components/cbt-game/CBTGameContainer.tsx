"use client";

import React, { useState, useEffect } from 'react';
import { LEVELS, AVATARS, Avatar, Choice } from "@/lib/cbt-game-data";
import AvatarSelection from "./AvatarSelection";
import BattleEncounter from "./BattleEncounter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Skull, RefreshCw, Star, Heart, Play } from "lucide-react";
import { motion } from "framer-motion";

type GameState = 'intro' | 'avatar_selection' | 'playing' | 'victory' | 'game_over';

const MAX_HEALTH = 100;

export default function CBTGameContainer() {
  const [gameState, setGameState] = useState<GameState>('avatar_selection');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [score, setScore] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [lastHealthChange, setLastHealthChange] = useState<number | null>(null);

  const currentLevel = LEVELS[currentLevelIndex];

  useEffect(() => {
    const savedState = localStorage.getItem('cbt_game_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.gameState === 'playing' && parsed.selectedAvatar) {
        }
      } catch (e) {
        console.error("Failed to parse saved game", e);
      }
    }
  }, []);

  const loadGame = () => {
    const savedState = localStorage.getItem('cbt_game_state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState(parsed.gameState);
      setCurrentLevelIndex(parsed.currentLevelIndex);
      setHealth(parsed.health);
      setScore(parsed.score);
      setSelectedAvatar(parsed.selectedAvatar);
      setIsLevelComplete(parsed.isLevelComplete);
    }
  };

  const hasSavedGame = () => {
    if (typeof window === 'undefined') return false;
    const savedState = localStorage.getItem('cbt_game_state');
    if (!savedState) return false;
    try {
      const parsed = JSON.parse(savedState);
      return parsed.gameState === 'playing' && !!parsed.selectedAvatar;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      localStorage.setItem('cbt_game_state', JSON.stringify({
        gameState,
        currentLevelIndex,
        health,
        score,
        selectedAvatar,
        isLevelComplete
      }));
    } else if (gameState === 'intro') {
    } else if (gameState === 'victory' || gameState === 'game_over') {
       localStorage.removeItem('cbt_game_state');
    }
  }, [gameState, currentLevelIndex, health, score, selectedAvatar, isLevelComplete]);

  const handleStartGame = () => {
    setGameState('avatar_selection');
  };

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    setGameState('playing');
    setHealth(MAX_HEALTH);
    setScore(0);
    setCurrentLevelIndex(0);
    setIsLevelComplete(false);
    setLastFeedback(null);
  };

  const handleChoiceSelected = (choice: Choice) => {
    const newHealth = Math.min(MAX_HEALTH, Math.max(0, health + choice.healthChange));
    const newScore = score + choice.scoreChange;
    setHealth(newHealth);
    setScore(newScore);
    setLastFeedback(choice.feedback);
    setLastHealthChange(choice.healthChange);
    setIsLevelComplete(true);
    if (newHealth <= 0) {
    }
  };

  const handleNextLevel = () => {
    if (health <= 0) {
      setGameState('game_over');
      return;
    }
    if (currentLevelIndex + 1 < LEVELS.length) {
      setCurrentLevelIndex(prev => prev + 1);
      setIsLevelComplete(false);
      setLastFeedback(null);
      setLastHealthChange(null);
    } else {
      setGameState('victory');
      triggerConfetti();
    }
  };

  const handleRestart = () => {
    setGameState('avatar_selection');
    setHealth(MAX_HEALTH);
    setScore(0);
    setCurrentLevelIndex(0);
    setIsLevelComplete(false);
    setSelectedAvatar(null);
    setLastFeedback(null);
  };

  const triggerConfetti = async () => {
    const { default: confetti } = await import('canvas-confetti');
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 } as any;
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };


  if (gameState === 'avatar_selection') {
    return <AvatarSelection onSelect={handleAvatarSelect} />;
  }

  if (gameState === 'playing') {
    return (
      <div className="space-y-6 w-full max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-card border rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
               <span className="text-xl">🛡️</span>
             </div>
             <div>
               <h3 className="font-bold">{selectedAvatar?.name}</h3>
               <p className="text-xs text-muted-foreground">{selectedAvatar?.class}</p>
             </div>
          </div>
          <div className="flex items-center gap-8 w-full md:w-auto">
             <div className="flex-1 md:w-48 space-y-1">
               <div className="flex justify-between text-xs font-medium">
                 <span>Health</span>
                 <span className={health < 30 ? "text-red-500" : "text-green-500"}>{health}/{MAX_HEALTH}</span>
               </div>
               <Progress value={(health / MAX_HEALTH) * 100} className="h-2" />
             </div>
             <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
               <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
               <span className="font-bold">{score}</span>
             </div>
          </div>
        </header>
        <BattleEncounter 
          level={currentLevel}
          currentHealth={health}
          maxHealth={MAX_HEALTH}
          onChoiceSelected={handleChoiceSelected}
          onNextLevel={handleNextLevel}
          isLevelComplete={isLevelComplete}
          feedback={lastFeedback}
          healthChange={lastHealthChange}
        />
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-12 rounded-2xl shadow-2xl border-4 border-yellow-500/20 max-w-2xl w-full"
        >
          <div className="mx-auto bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold text-yellow-600 mb-4">Quest Completed!</h2>
          <p className="text-xl text-muted-foreground mb-8">
            You have successfully navigated through the valley of shadows and learned to challenge your negative thoughts.
          </p>
          <div className="flex justify-center gap-12 mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Final Score</p>
              <p className="text-4xl font-bold">{score}</p>
            </div>
            <div className="text-center">
               <p className="text-sm text-muted-foreground uppercase tracking-wider">Health Remaining</p>
               <p className="text-4xl font-bold text-green-600">{health}</p>
            </div>
          </div>
          <Button size="lg" onClick={handleRestart} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Play Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'game_over') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] p-8 text-center space-y-8">
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-card p-12 rounded-2xl shadow-2xl border-4 border-red-500/20 max-w-2xl w-full"
        >
          <div className="mx-auto bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Skull className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-red-600 mb-4">Defeated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            The negative thoughts were too strong this time. But remember, in the real world, you can always try again and learn new strategies.
          </p>
          <Button size="lg" variant="destructive" onClick={handleRestart} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return null;
}