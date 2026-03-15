"use client";

import { Head, Link, usePage, router } from "@inertiajs/react";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mentoring, leaderboard as leaderboardRoute, missions as missionsRoute, shop, profile } from "@/routes";
import { useAppearance } from "@/hooks/use-appearance";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { route } from 'ziggy-js';
import { toast } from "sonner";
import {
  Trophy,
  Target,
  Star,
  Flame,
  CheckCircle2,
  ShoppingCart,
  User,
  MoreHorizontal,
  Award,
  Zap,
  Clock,
  Calendar,
} from "lucide-react";

type SharedProps = {
  auth: { user: { id: number; name: string; email: string } | null };
};

export default function MissionsPage() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  const { updateAppearance } = useAppearance();
  const { auth } = usePage<SharedProps>().props;
  const _name = auth?.user?.name ?? "Player";
  const userId = auth?.user?.id ?? null;
  const [dailyMissions, setDailyMissions] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateAppearance("light");
  }, [updateAppearance]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(route('api.missions.index'));
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((m: unknown) => ({
          id: m.id,
          slug: m.key,
          title: m.title,
          description: `Selesaikan ${m.target} kali`,
          icon: m.key === 'gratitude-journal' ? '✍️' : m.key === 'breathing-exercise' ? '🧘' : '⚡',
          icon_bg: m.key === 'gratitude-journal' ? 'from-amber-400 to-orange-500' : 'from-blue-400 to-indigo-600',
          target_total: m.target,
          xp_reward: m.xp_reward,
          computed_progress: m.progress,
          is_completed: m.is_completed
        }));
        setDailyMissions(mapped);
      }
    } catch (e) {
      console.error("Failed to load missions", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  return (
    <div className="missions-ref-theme antialiased min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Head title="Missions" />

      <DashboardTopNav />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Misi Kamu</h1>
          <p className="text-gray-600">Selesaikan misi untuk mendapatkan XP dan naik level</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("daily")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "daily"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
          >
            <Clock className="w-4 h-4" />
            Misi Harian
            {activeTab === "daily" && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                4
              </Badge>
            )}
          </button>

          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "weekly"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
          >
            <Calendar className="w-4 h-4" />
            Misi Mingguan
            {activeTab === "weekly" && (
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                2
              </Badge>
            )}
          </button>
        </div>

        {/* Daily Missions */}
        {activeTab === "daily" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Misi Harian</h2>
              <Badge variant="outline" className="text-orange-600 border-orange-300 bg-orange-50">
                <Clock className="w-3 h-3 mr-1" />
                Reset dalam 6 jam
              </Badge>
            </div>

            {loading && (
              <div className="space-y-3">
                <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
                <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
              </div>
            )}
            {!loading && dailyMissions.map((m, idx) => (
              <MissionCard
                key={`${m.slug}-${idx}`}
                title={m.title}
                description={m.description}
                icon={m.icon}
                iconBg={m.icon_bg}
                progress={Number(m.computed_progress) || 0}
                total={Number(m.target_total)}
                xp={Number(m.xp_reward)}
                isCompleted={Boolean(m.is_completed)}
                isReady={!m.is_completed && (Number(m.computed_progress) || 0) >= Number(m.target_total)}
                delay={0.1 + idx * 0.1}
                onSolve={async () => {
                  if (!userId || m.is_completed) return;
                  try {
                    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
                    const res = await fetch(route('api.missions.update', { id: m.id }), {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
                      body: JSON.stringify({
                        progress: m.computed_progress < m.target_total ? m.computed_progress + 1 : m.computed_progress,
                        is_completed: true
                      })
                    });

                    if (res.ok) {
                      toast.success("Misi selesai! XP telah ditambahkan.");
                      router.reload({ only: ['auth'] });
                      load();
                    }
                  } catch (e) {
                    toast.error("Gagal update misi");
                  }
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Weekly Missions */}
        {activeTab === "weekly" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Misi Mingguan</h2>
              <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
                <Calendar className="w-3 h-3 mr-1" />
                Reset dalam 3 hari
              </Badge>
            </div>

            <MissionCard
              title="Juara Mingguan"
              description="Complete 50 missions this week"
              icon="🏆"
              iconBg="from-amber-400 to-yellow-500"
              progress={32}
              total={50}
              xp={500}
              delay={0.1}
            />

            <MissionCard
              title="Master Class"
              description="Get grade A in 10 different lessons"
              icon="👑"
              iconBg="from-indigo-400 to-purple-600"
              progress={6}
              total={10}
              xp={750}
              delay={0.2}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function NavTab({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${active
        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

interface MissionCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  progress: number;
  total: number;
  xp: number;
  isCompleted?: boolean;
  isReady?: boolean;
  delay: number;
  onSolve?: () => Promise<void> | void;
}

function MissionCard({
  title,
  description,
  icon,
  iconBg,
  progress,
  total,
  xp,
  isCompleted = false,
  isReady = false,
  delay,
  onSolve,
}: MissionCardProps) {
  const percentage = useMemo(() => (progress / total) * 100, [progress, total]);

  console.log(`Rendering Mission: ${title}, Progress: ${progress}/${total}, Completed: ${isCompleted}, Ready: ${isReady}`);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card
        className={`border-0 shadow-md transition-all ${isCompleted
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500 opacity-90"
          : "bg-white hover:shadow-xl hover:scale-[1.01]"
          }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3 leading-tight">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-0.5 text-gray-900 line-clamp-1">{title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{description}</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {isCompleted ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white shadow-sm border-0 px-3">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                      Selesai
                    </Badge>
                  ) : isReady ? (
                    <Button
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); if (onSolve) onSolve(); }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-9 px-4 rounded-xl shadow-lg animate-pulse"
                    >
                      Klaim XP! 🚀
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-full">
                      <Zap className="w-4 h-4 fill-current" />
                      <span className="text-sm">+{xp} XP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Progress
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {progress} / {total}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                    className={`h-full rounded-full ${isCompleted ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-purple-500 to-indigo-600"
                      }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
