import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import { mentoring, leaderboard as leaderboardRoute, missions as missionsRoute, shop, profile as profileRoute } from '@/routes';
import { route } from 'ziggy-js';
import { Pencil, Flame, Zap, Shield, Trophy, Target, ShoppingCart, User, MoreHorizontal, Star, Award } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { useAppearance } from '@/hooks/use-appearance';
import { Progress } from "@/components/ui/progress";

type StatItem = { label: string; value: number | string; icon: React.ReactNode };

function NavTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
        active
          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string; avatar?: string } | null;
    };
};

interface MoodLog {
  created_at: string;
  mood: string;
}

const moodToScore: Record<string, number> = {
    "😡": 1,
    "😟": 2,
    "😐": 3,
    "🙂": 4,
    "😄": 5,
};

export default function ProfilePage() {
    const { auth } = usePage<SharedProps>().props;
    const { updateAppearance } = useAppearance();

    const name = auth?.user?.name ?? 'Player One';
    const email = auth?.user?.email ?? 'user@example.com';
    const handle = `@${(email.split('@')[0] || 'player').replace(/[^a-zA-Z0-9_]/g, '')}`;

    const stats: StatItem[] = [
        { label: 'Day streak', value: 2, icon: <Flame className="w-5 h-5 text-orange-400" /> },
        { label: 'Total XP', value: 20, icon: <Zap className="w-5 h-5 text-yellow-300" /> },
        { label: 'Current league', value: 'Gold', icon: <Shield className="w-5 h-5 text-amber-400" /> },
        { label: 'Top 3 finishes', value: 0, icon: <Trophy className="w-5 h-5 text-blue-300" /> },
    ];

    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    const joinedLabel = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    return (
      <div className="missions-ref-theme antialiased min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Head title="Profil" />
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">MindPath</h1>
                  <p className="text-xs text-gray-500">Perjalanan Mental Sehat</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <Link href={mentoring()} className="contents" prefetch>
                  <NavTab icon={<Target className="w-4 h-4" />} label="Belajar" />
                </Link>
                <Link href={leaderboardRoute()} className="contents" prefetch>
                  <NavTab icon={<Trophy className="w-4 h-4" />} label="Skor" />
                </Link>
                <Link href={missionsRoute()} className="contents" prefetch>
                  <NavTab icon={<Award className="w-4 h-4" />} label="Misi" />
                </Link>
                <Link href={shop()} className="contents" prefetch>
                  <NavTab icon={<ShoppingCart className="w-4 h-4" />} label="Toko" />
                </Link>
                <Link href={profileRoute()} className="contents" prefetch>
                  <NavTab icon={<User className="w-4 h-4" />} label="Profil" active />
                </Link>
                <NavTab icon={<MoreHorizontal className="w-4 h-4" />} label="Lainnya" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {name.slice(0, 1).toUpperCase()}
                </div>
                <span className="hidden sm:block font-semibold">{name}</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex items-start gap-8">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 overflow-hidden rounded-full ring-4 ring-purple-200">
                  <AvatarImage src={auth?.user?.avatar} alt={name} />
                  <AvatarFallback className="rounded-full bg-purple-600 text-white">
                    {name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-600">{handle}</p>
                  <p className="text-xs text-gray-500">Joined {joinedLabel}</p>
                  <p className="text-xs text-gray-500">0 following • 0 followers</p>
                </div>
                <div className="ml-auto">
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Link href={route('profile.edit')} className="inline-flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Profil</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Statistics</h3>
                <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                  {stats.map((s) => (
                    <div key={s.label} className="group h-full min-h-[72px] rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 transition-transform group-hover:scale-105">
                          {s.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-black text-gray-900 leading-tight">{s.value}</div>
                          <div className="text-xs font-semibold text-gray-600">{s.label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
                  <button className="text-xs font-bold text-purple-600">VIEW ALL</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Wildfire', level: 'LEVEL 10', progress: 260, total: 365, description: 'Reach a 365 day streak', gradient: 'from-orange-400 to-amber-400' },
                    { title: 'Sage', level: 'LEVEL 8', progress: 7944, total: 12500, description: 'Earn 12500 XP', gradient: 'from-green-400 to-emerald-500' },
                    { title: 'Champion', level: 'LEVEL 6', progress: 5, total: 6, description: 'Advance to the Emerald League', gradient: 'from-yellow-400 to-amber-500' },
                  ].map((a, idx) => (
                    <Card key={idx} className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center text-xs font-black text-white`}>{a.level}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-gray-900">{a.title}</div>
                              <div className="text-sm text-gray-600">{a.progress}/{a.total}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-600">{a.description}</div>
                            <div className="mt-3">
                              <Progress value={Math.min(100, Math.round((a.progress / a.total) * 100))} className="h-2 bg-gray-200 [&>div]:bg-purple-600" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 space-y-4">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="text-sm font-bold text-gray-900">Friends</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Find friends</Button>
                    <Button variant="outline" className="w-full">Invite friends</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
}
