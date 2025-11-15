"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Trophy,
  Flame,
  ShoppingCart,
  UserRound,
  Menu,
  Sparkles,
  Star,
  TrendingUp,
  Calendar,
  Activity,
  Heart,
  Smile,
  Target,
  Award,
  Zap,
  Clock,
  ChevronRight,
  Play,
  BookOpen,
  Code2,
  MessageCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { mentoring, leaderboard, missions, shop, profile } from "@/routes";
import { useAppearance } from "@/hooks/use-appearance";

type SharedProps = {
  auth: {
    user: { id: number; name: string; email: string } | null;
  };
};

function ymd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Dashboard() {
  const { auth } = usePage<SharedProps>().props;
  const name = auth?.user?.name ?? "Player";
  const { updateAppearance } = useAppearance();

  const [currentStreak, setCurrentStreak] = useState(3);
  const [totalPoints] = useState(245);
  const [level] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(2 * 60 * 60);
  const [friendEmail, setFriendEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Force light theme for this page to match the reference design
  useEffect(() => {
    updateAppearance("light");
  }, [updateAppearance]);

  const DAILY_GOAL_XP = 10;
  const [dailyXP, setDailyXP] = useState(2);
  const dailyPct = useMemo(
    () => Math.min(100, Math.round((dailyXP / DAILY_GOAL_XP) * 100)),
    [dailyXP]
  );

  const quickActions = [
    { icon: Brain, label: "Belajar", color: "bg-purple-500", href: mentoring().url, active: true },
    { icon: Trophy, label: "Skor", color: "bg-yellow-500", href: leaderboard().url },
    { icon: Target, label: "Misi", color: "bg-blue-500", href: missions().url },
    { icon: ShoppingCart, label: "Toko", color: "bg-green-500", href: shop().url },
    { icon: UserRound, label: "Profil", color: "bg-pink-500", href: profile().url },
    { icon: Award, label: "Lainnya", color: "bg-gray-500", href: "/" },
  ] as const;

  const achievements = [
    { icon: Flame, label: "Streak", value: `${currentStreak} hari`, color: "text-orange-500" },
    { icon: Star, label: "Level", value: level, color: "text-yellow-500" },
    { icon: Zap, label: "XP", value: totalPoints, color: "text-purple-500" },
    { icon: Award, label: "Badge", value: "12", color: "text-blue-500" },
  ] as const;

  const [streak, setStreak] = useState<number>(0);
  const [moodHistory, setMoodHistory] = useState<Record<string, { emoji: string; label?: string }>>({});
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const currentMonthLabel = currentMonthDate.toLocaleString("id-ID", { month: "long", year: "numeric" });

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const res = await fetch("/moods", { headers: { Accept: "application/json" } });
        if (!res.ok) return;
        const payload = await res.json();
        const map: Record<string, { emoji: string; label?: string }> = {};
        if (Array.isArray(payload?.data)) {
          for (const log of payload.data) {
            if (log?.date && log?.mood) {
              map[log.date] = { emoji: log.mood as string, label: (log.label as string | undefined) };
            }
          }
        }
        setMoodHistory(map);
        setStreak(typeof payload?.streak === "number" ? payload.streak : 0);
        setCurrentStreak(typeof payload?.streak === "number" ? payload.streak : currentStreak);
      } catch {}
    };
    loadMoods();
  }, []);

  async function saveMoodQuick() {
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
      const today = ymd(new Date());
      const res = await fetch("/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
          Accept: "application/json",
        },
        body: JSON.stringify({ mood: "🙂", label: "Baik", date: today }),
      });
      const payload = await res.json().catch(() => ({}));
      const date = typeof payload?.date === "string" ? payload.date : today;
      setMoodHistory((prev) => ({ ...prev, [date]: { emoji: "🙂", label: "Baik" } }));
      setStreak((s) => (typeof payload?.streak === "number" ? payload.streak : s));
    } catch {}
  }

  const calendarDays = (() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const leading = (firstDay + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: Array<{ day: number | null; highlighted: boolean }> = [];
    for (let i = 0; i < leading; i++) days.push({ day: null, highlighted: false });
    for (let d = 1; d <= totalDays; d++) {
      const date = ymd(new Date(year, month, d));
      const hasMood = !!moodHistory[date];
      days.push({ day: d, highlighted: hasMood });
    }
    return days;
  })();

  const handleInviteFriend = (e: React.FormEvent) => {
    e.preventDefault();
    setFriendEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <Head title="Dashboard" />

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MindPath</h1>
                <p className="text-xs text-gray-500">Perjalanan Mental Sehat</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    action.active ? `${action.color} text-white shadow-lg scale-105` : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <action.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{action.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {name.slice(0, 1).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-purple-900">{name}</span>
              </div>
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-800/30 rounded-full blur-2xl -ml-24 -mb-24" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Smile className="w-6 h-6 text-yellow-300" />
                      <span className="text-yellow-300 text-sm font-semibold">Howdy @{name}! How are you feeling?</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Halo, {name}! 👋</h2>
                    <p className="text-purple-100 text-sm">Bagaimana perasaanmu hari ini? Mari lanjutkan perjalanan mentalmu.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                      <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                      <div className="text-2xl font-black text-white">{item.value}</div>
                      <div className="text-xs text-purple-100">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
              <div className="h-2 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400" />
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/30 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 mb-3 font-bold">🌱 PERJALANAN HARIAN</Badge>
                      <h3 className="text-2xl font-black text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="w-7 h-7 text-rose-500" />
                        Kesehatan Mental Journey
                      </h3>
                      <p className="text-sm text-gray-700 font-medium">Latihan berikutnya: <span className="font-bold text-teal-700">Meditasi Pernapasan 5 Menit</span></p>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-0 flex items-center gap-1.5 px-4 py-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-bold">Level {level}</span>
                    </Badge>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-teal-600" />
                      <span className="text-sm font-bold text-gray-700">Progress Minggu Ini</span>
                    </div>
                    <span className="text-2xl font-black bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">65%</span>
                  </div>

                  <div className="relative">
                    <Progress value={65} className="h-4 mb-2" />
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold">
                      <span>13 dari 20 latihan selesai</span>
                      <span className="text-teal-700">+7 latihan lagi!</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-5 mb-5">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                      <Brain className="w-5 h-5 text-blue-600 mb-1" />
                      <div className="text-lg font-black text-blue-900">8</div>
                      <div className="text-xs text-blue-700 font-semibold">Mindfulness</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                      <Activity className="w-5 h-5 text-green-600 mb-1" />
                      <div className="text-lg font-black text-green-900">5</div>
                      <div className="text-xs text-green-700 font-semibold">Breathing</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                      <Heart className="w-5 h-5 text-purple-600 mb-1" />
                      <div className="text-lg font-black text-purple-900">12</div>
                      <div className="text-xs text-purple-700 font-semibold">Gratitude</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={mentoring().url} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 hover:from-teal-700 hover:via-green-700 hover:to-emerald-700 text-white font-bold shadow-lg h-12 text-base group-hover:scale-[1.02] transition-transform">
                        <Play className="w-5 h-5 mr-2" /> Mulai Latihan
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-2 border-teal-300 text-teal-700 hover:bg-teal-50 font-bold h-12 px-6">
                      <Activity className="w-4 h-4 mr-2" /> Lihat Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Jelajahi Lebih Banyak</h3>
                <p className="text-sm text-gray-600">Temukan aktivitas menarik untuk pengembangan dirimu</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[{ title: "Challenge Packs", description: "Prove what you learned with bite-sized code challenges.", icon: Code2, gradient: "from-orange-400 via-yellow-500 to-orange-500" }, { title: "Project Tutorials", description: "Explore fun, step-by-step projects from first build to pro.", icon: BookOpen, gradient: "from-blue-400 via-cyan-500 to-blue-500" }, { title: "#30NitesOfCode", description: "Commit to 30 days of learning with a virtual pet.", icon: Award, gradient: "from-green-400 via-emerald-500 to-green-500" }, { title: "Teman Cerita AI", description: "Tempat aman untuk berbagi pikiran dan perasaanmu.", icon: MessageCircle, gradient: "from-pink-400 via-rose-500 to-pink-500" }].map((card, idx) => (
                  <div key={idx} className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />
                    <Card className="relative border-2 border-gray-100 hover:border-transparent overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                            <card.icon className="w-7 h-7 text-white" />
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl animate-ping opacity-0 group-hover:opacity-30`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-black text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">{card.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">Gratis</Badge>
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50">Populer</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-5">{card.description}</p>
                        <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-purple-600 hover:to-pink-600 text-white font-semibold group/btn h-11 transition-all duration-300">
                          <span>Mulai Sekarang</span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-yellow-100 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Buka Papan Skor!</h3>
                    <p className="text-sm text-gray-600 mb-3">Selesaikan 10 pelajaran lagi untuk mulai berkompetisi</p>
                  </div>
                </div>
                <Link href={mentoring().url}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">Mulai Pelajaran</Button>
                </Link>
                <p className="text-center text-sm font-semibold text-purple-700 mt-2">Dapatkan 10 XP</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Misi Harian</h3>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {`${Math.floor(timeRemaining / 3600)} JAM ${Math.floor((timeRemaining % 3600) / 60)} MENIT`}
                  </Badge>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-purple-900">{dailyXP} / {DAILY_GOAL_XP}</span>
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <Progress value={dailyPct} className="h-3 mb-2" />
                  <p className="text-sm text-purple-700 font-semibold">Selesaikan {Math.max(0, DAILY_GOAL_XP - dailyXP)} misi lagi hari ini</p>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold" onClick={() => setDailyXP((v) => Math.min(DAILY_GOAL_XP, v + 2))}>Kerjakan</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Mood Tracker</h3>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-0">Buka</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border border-orange-200">
                  <div className="flex items-center justify-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <p className="text-sm font-semibold text-gray-700">Streak: <span className="text-orange-600">{streak} hari berturut-turut</span></p>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold" onClick={saveMoodQuick}>
                  <Smile className="w-4 h-4 mr-2" />
                  Catat Mood Hari Ini
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>
                    <ChevronRight className="w-4 h-4 text-gray-600 rotate-180" />
                  </button>
                  <h3 className="font-bold text-gray-900">{currentMonthLabel}</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setCurrentMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-500">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((item, idx) => (
                      <div key={idx} className={`aspect-square flex items-center justify-center text-sm font-semibold rounded-lg transition-all ${ item.day === null ? "invisible" : item.highlighted ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110" : "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer" }`}>
                        {item.day}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-1">🧠</div>
                  <div className="text-white font-black text-xl">💚</div>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Ajak Teman!</h2>
              <p className="text-gray-300 text-base mb-5 leading-relaxed">Sedang seru? Bagikan kebahagiaan dengan teman! 🎉<br />Masukkan email dan kami akan kirimkan undangan personal. 📧</p>
              <form onSubmit={handleInviteFriend} className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Email temanmu" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} className="flex-1 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 text-base" required />
                <Button type="submit" className="h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-gray-900 font-black text-base shadow-lg hover:shadow-xl transition-all">
                  Kirim Undangan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
