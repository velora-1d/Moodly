import { Head, Link, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import {
  Brain,
  Heart,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Clock,
  Flame,
  Trophy,
  Star,
  Zap,
  Wind,
  Sun,
  Moon,
  CloudRain,
  Coffee,
  Book,
  Music,
  Gem,
  Menu,
  Settings,
  ShoppingCart,
  Target,
  Award,
} from 'lucide-react';
import { mentoring, leaderboard as leaderboardRoute, missions, shop, profile } from '@/routes';

type SharedProps = {
  auth: {
    user: { id: number; name: string; email: string } | null;
  };
};

type Entry = { rank: number; name: string; statusIcon: string; wellnessPoints: number; trend: number };
// Adapt existing dummy entries to new schema (keep visual identical to reference)
const entries: Entry[] = [
  { rank: 1, name: 'Jesse', statusIcon: 'flame', wellnessPoints: 2300, trend: 1 },
  { rank: 2, name: 'laichandra', statusIcon: 'star', wellnessPoints: 1800, trend: -1 },
  { rank: 3, name: 'clay', statusIcon: 'gem', wellnessPoints: 1600, trend: 1 },
  { rank: 4, name: 'Schot', statusIcon: 'zap', wellnessPoints: 1200, trend: -1 },
  { rank: 5, name: 'Silent', statusIcon: 'wind', wellnessPoints: 1100, trend: 1 },
  { rank: 6, name: 'Player M', statusIcon: 'moon', wellnessPoints: 900, trend: 1 },
  { rank: 7, name: 'Zoe', statusIcon: 'sun', wellnessPoints: 800, trend: -1 },
  { rank: 8, name: 'Ray', statusIcon: 'coffee', wellnessPoints: 700, trend: -1 },
  { rank: 9, name: 'Yun', statusIcon: 'book', wellnessPoints: 600, trend: 1 },
  { rank: 10, name: 'Koa', statusIcon: 'music', wellnessPoints: 500, trend: -1 },
];

const statusIcons = {
  flame: <Flame className="w-5 h-5 text-orange-500" />,
  star: <Star className="w-5 h-5 text-yellow-500" />,
  gem: <Gem className="w-5 h-5 text-blue-500" />,
  zap: <Zap className="w-5 h-5 text-purple-500" />,
  wind: <Wind className="w-5 h-5 text-teal-500" />,
  sun: <Sun className="w-5 h-5 text-amber-500" />,
  moon: <Moon className="w-5 h-5 text-indigo-500" />,
  cloud: <CloudRain className="w-5 h-5 text-sky-500" />,
  coffee: <Coffee className="w-5 h-5 text-brown-500" />,
  book: <Book className="w-5 h-5 text-violet-500" />,
  music: <Music className="w-5 h-5 text-pink-500" />,
} as const;

export default function Leaderboard() {
  const { updateAppearance } = useAppearance();
  const { auth } = usePage<SharedProps>().props;
  const name = auth?.user?.name ?? 'Player';

  const quickActions = [
    // Di halaman leaderboard: hanya "Skor" aktif ungu, lainnya normal abu-abu
    { icon: Brain, label: 'Belajar', color: '', href: mentoring(), active: false },
    { icon: Trophy, label: 'Skor', color: 'bg-gradient-to-r from-purple-500 to-pink-500', href: leaderboardRoute(), active: true },
    { icon: Target, label: 'Misi', color: '', href: missions(), active: false },
    { icon: ShoppingCart, label: 'Toko', color: '', href: shop(), active: false },
    { icon: Settings, label: 'Profil', color: '', href: profile(), active: false },
    { icon: Award, label: 'Lainnya', color: '', href: '/', active: false },
  ] as const;
  useEffect(() => {
    // Force light theme to replicate reference visuals exactly
    updateAppearance('light');
  }, [updateAppearance]);

  return (
    <div className="min-h-screen bg-background">
      <Head title="Leaderboard" />
      {/* Header/Navbar selaras dengan Dashboard */}
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
                    action.active ? `${action.color} text-white shadow-lg scale-105` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Leaderboard */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-2 rounded-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Serenity League</h1>
                  </div>
                  <p className="text-sm text-muted-foreground">Top 15 will advance to the Harmony League</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>5 days left</span>
                </div>
              </div>

              {/* Activity Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  { icon: <Heart className="w-4 h-4" />, label: 'Gratitude' },
                  { icon: <Flame className="w-4 h-4" />, label: 'Streak' },
                  { icon: <Star className="w-4 h-4" />, label: 'Badges' },
                  { icon: <Zap className="w-4 h-4" />, label: 'Breathing' },
                  { icon: <Sun className="w-4 h-4" />, label: 'Mindfulness' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors whitespace-nowrap"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Leaderboard Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">#</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Wellness Points</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.rank} className="border-b border-border">
                        <td className="py-4 px-4">
                          <span className="font-medium text-muted-foreground">{entry.rank}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-sm font-semibold">
                              {entry.name.charAt(0)}
                            </div>
                            <span className="font-medium">{entry.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center">
                            {statusIcons[entry.statusIcon as keyof typeof statusIcons]}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold">{entry.wellnessPoints.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-1">WP</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            {entry.trend > 0 ? (
                              <>
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-emerald-500 text-sm font-medium">+{entry.trend}</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <span className="text-red-500 text-sm font-medium">{entry.trend}</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Selector */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-3">Set Your Status</h2>
              <div className="grid grid-cols-6 gap-2">
                {[
                  { emoji: '🙂', color: 'bg-amber-50' },
                  { emoji: '😎', color: 'bg-sky-50' },
                  { emoji: '🧠', color: 'bg-violet-50' },
                  { emoji: '🛡️', color: 'bg-teal-50' },
                  { emoji: '⚡', color: 'bg-purple-50' },
                  { emoji: '🔥', color: 'bg-red-50' },
                  { emoji: '💤', color: 'bg-indigo-50' },
                  { emoji: '🎯', color: 'bg-green-50' },
                  { emoji: '🎮', color: 'bg-cyan-50' },
                  { emoji: '👾', color: 'bg-fuchsia-50' },
                  { emoji: '⭐', color: 'bg-yellow-50' },
                  { emoji: '💎', color: 'bg-blue-50' },
                ].map((mood, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      'aspect-square rounded-xl border-2 border-border flex items-center justify-center text-2xl transition-all hover:scale-110 hover:border-primary',
                      mood.color,
                    )}
                    title={mood.emoji}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            </Card>

            {/* Wellness Badges */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Wellness Badges</h2>
              <div className="grid grid-cols-4 gap-3">
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Sun className="w-6 h-6 text-amber-500" />
                </button>
                <button className="aspect-square rounded-xl border-2 border-border hover:border-primary hover:bg-accent transition-all flex items-center justify-center">
                  <Moon className="w-6 h-6 text-indigo-500" />
                </button>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">Your Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Daily Streak</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Flame className="w-3 h-3 mr-1" />
                    12 days
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Badges</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    8
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Wellness Points</span>
                  <Badge variant="secondary" className="font-semibold">
                    <Trophy className="w-3 h-3 mr-1" />
                    4,560 WP
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}