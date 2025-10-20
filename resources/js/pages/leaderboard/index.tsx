import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Trophy, Shield, Clock, ChevronUp, ChevronDown, Swords, Crown, Rocket, Star, Ghost, Skull } from 'lucide-react';

// Dummy data to show leaderboard entries
const entries = [
  { rank: 1, name: 'Jesse', xp: 23, status: '🔥', trend: 'up' as const },
  { rank: 2, name: 'laichandra', xp: 18, status: '👾', trend: 'down' as const },
  { rank: 3, name: 'clay', xp: 16, status: '💎', trend: 'up' as const },
  { rank: 4, name: 'Schot', xp: 12, status: '⚡', trend: 'down' as const },
  { rank: 5, name: 'Silent', xp: 11, status: '🕊️', trend: 'up' as const },
  { rank: 6, name: 'Player M', xp: 9, status: '👽', trend: 'up' as const },
  { rank: 7, name: 'Zoe', xp: 8, status: '🌙', trend: 'down' as const },
  { rank: 8, name: 'Ray', xp: 7, status: '🦊', trend: 'down' as const },
  { rank: 9, name: 'Yun', xp: 6, status: '🎮', trend: 'up' as const },
  { rank: 10, name: 'Koa', xp: 5, status: '⭐', trend: 'down' as const },
];

export default function Leaderboard() {
  return (
    <AppLayout
      leftActions={
        <div className="flex items-center gap-2">
          <Crown className="size-4 text-yellow-400" />
          <p className="text-sm font-medium">Liga Perunggu</p>
        </div>
      }
      rightActions={
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-sidebar-border/60 bg-background/60 px-3 py-1">
          <Shield className="size-4 text-emerald-400" />
          <span className="font-mono text-xs text-muted-foreground">Arcade</span>
        </div>
      }
    >
      <Head title="Leaderboard" />
      <div className="grid gap-4 p-4 md:grid-cols-3">
        {/* Main column: Leaderboard list */}
        <div className="space-y-4 md:col-span-2">
          {/* League banner */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card px-4 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-yellow-400/40 bg-yellow-400/10"><Trophy className="size-4 text-yellow-300" /></div>
                <div>
                  <p className="text-sm font-semibold">Liga Perunggu</p>
                  <p className="text-xs text-muted-foreground">15 teratas akan naik liga berikutnya</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="size-4" />5 hari</div>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
              {[Swords, Rocket, Star, Ghost, Skull].map((Icon, i) => (
                <div key={i} className="flex h-10 items-center justify-center rounded-lg border border-sidebar-border/50 bg-muted/60">
                  <Icon className="size-4 opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Scoreboard */}
          <div className="rounded-xl border border-sidebar-border/70 bg-card">
            <div className="grid grid-cols-6 border-b border-sidebar-border/60 px-4 py-2 text-xs text-muted-foreground">
              <div>#</div>
              <div className="col-span-2">Nama</div>
              <div className="text-center">Status</div>
              <div className="text-center">XP</div>
              <div className="text-right">Trend</div>
            </div>
            <ul className="divide-y divide-sidebar-border/60">
              {entries.map((e) => (
                <li key={e.rank} className="grid grid-cols-6 items-center px-4 py-2">
                  <div className="font-mono text-xs">{e.rank}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md border border-sidebar-border/50 bg-[repeating-linear-gradient(45deg,#0000_0_8px,#ffffff10_8px_16px)]" />
                    <p className="text-sm font-semibold">{e.name}</p>
                  </div>
                  <div className="text-center text-sm">{e.status}</div>
                  <div className="text-center font-mono text-sm">{e.xp} XP</div>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    {e.trend === 'up' ? (
                      <ChevronUp className="size-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="size-4 text-red-400" />
                    )}
                    <span className="text-muted-foreground">{e.trend === 'up' ? '+1' : '-1'}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Status picker + badges */}
        <div className="space-y-4">
          <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
            <p className="text-sm font-semibold">Pasang statusmu</p>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {['🙂','😎','🧠','🛡️','⚡','🔥','💤','🎯','🎮','👾','⭐','💎'].map((s, i) => (
                <button key={i} className="aspect-square rounded-lg border border-sidebar-border/50 bg-muted/60 text-lg hover:border-sky-400/60">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
            <p className="text-sm font-semibold">Lencana Arcade</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[Swords, Rocket, Star, Ghost].map((Icon, i) => (
                <div key={i} className="flex h-14 items-center justify-center rounded-lg border border-sidebar-border/50 bg-[repeating-linear-gradient(45deg,#0000_0_12px,#ffffff10_12px_24px)]">
                  <Icon className="size-5 opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}