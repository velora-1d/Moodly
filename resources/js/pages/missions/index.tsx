import AppLayout from '@/layouts/app-layout';
import { dashboard, missions } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Zap, Lock, Trophy, Clock, Medal } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Missions', href: missions().url },
];

export default function MissionsPage() {
    // Daily mission progress (mock for now)
    const DAILY_GOAL_XP = 10;
    const [dailyXP, setDailyXP] = useState(2);
    const progressPct = useMemo(
        () => Math.min(100, Math.round((dailyXP / DAILY_GOAL_XP) * 100)),
        [dailyXP],
    );

    const timeLeftLabel = '2 JAM';

    const lockedMissions = [
        {
            id: 'locked-1',
            title: 'Misi lain akan segera terbuka',
            description: 'Selesaikan misi harian untuk membuka misi berikutnya',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Missions" />

            <div className="space-y-6 p-6">
                {/* Top grid: welcome + monthly challenge */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Welcome banner */}
                    <div className="lg:col-span-2 rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-emerald-500/20 p-5">
                        <div className="flex items-start justify-between">
                            <div className="max-w-xl">
                                <h2 className="text-lg font-bold text-foreground">Selamat datang!</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Taklukkan misi untuk mendapatkan hadiah! Misi direset setiap hari.
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-2 rounded-lg border border-sidebar-border/60 bg-background/60 px-3 py-2">
                                <Medal className="size-5 text-yellow-400" />
                                <span className="font-mono text-xs text-muted-foreground">Arcade Mode</span>
                            </div>
                        </div>

                        {/* Pixel pattern */}
                        <div className="mt-4 h-24 w-full rounded-md border border-sidebar-border/60 bg-[repeating-linear-gradient(45deg,#0000_0_12px,#ffffff10_12px_24px)]" />
                    </div>

                    {/* Monthly challenge card */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-sidebar p-5">
                        <div className="flex items-center gap-3">
                            <Trophy className="size-5 text-yellow-400" />
                            <p className="text-sm font-semibold text-foreground">
                                Tantangan bulanan akan segera terbuka!
                            </p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Selesaikan tantangan setiap bulan untuk mendapatkan lencana eksklusif.
                        </p>
                        <div className="mt-3">
                            <Link href={dashboard()} prefetch>
                                <Button className="w-full rounded-sm" variant="default">
                                    Mulai Pelajaran
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Daily mission */}
                <div className="rounded-xl border border-sidebar-border/70 bg-card p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-yellow-400/40 bg-yellow-400/10">
                                <Zap className="size-4 text-yellow-300" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Dapatkan {DAILY_GOAL_XP} XP</p>
                                <p className="text-xs text-muted-foreground">Misi Harian</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="size-4" />
                            {timeLeftLabel}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                        <div className="relative h-3 w-full overflow-hidden rounded-md border border-sidebar-border/60 bg-muted">
                            <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                                style={{ width: `${progressPct}%` }}
                            />
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0000_0_8px,#ffffff10_8px_16px)]" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="font-mono text-xs text-muted-foreground">
                                {dailyXP} / {DAILY_GOAL_XP}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 rounded-md border border-sidebar-border/60 px-2 py-1">
                                    <Zap className="size-3 text-yellow-300" />
                                    <span className="font-mono text-xs">XP</span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-sm"
                                    onClick={() => setDailyXP((v) => Math.min(DAILY_GOAL_XP, v + 2))}
                                >
                                    Kerjakan Misi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locked missions */}
                <div className="rounded-xl border border-sidebar-border/70 bg-muted/40 p-5">
                    {lockedMissions.map((m) => (
                        <div
                            key={m.id}
                            className="flex items-center justify-between rounded-lg border border-dashed border-sidebar-border/60 bg-background/50 px-4 py-3"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-sidebar-border/60 bg-background/60">
                                    <Lock className="size-4 opacity-70" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{m.title}</p>
                                    <p className="text-xs text-muted-foreground">{m.description}</p>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" className="rounded-sm" disabled>
                                Segera
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
