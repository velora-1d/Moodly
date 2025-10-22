import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { mentoring, missions, profile, shop } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Clock,
    Code2,
    Egg,
    Flag,
    Ghost,
    HeartHandshake,
    Puzzle,
    ShieldCheck,
    ShoppingCart,
    Trophy,
    User,
    Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
};

export default function Dashboard() {
    const { auth } = usePage<SharedProps>().props;
    const name = auth?.user?.name ?? 'Player';

    const HERO_GOAL = 100;
    const [heroProgress, setHeroProgress] = useState(3);
    const heroPct = useMemo(
        () => Math.min(100, Math.round((heroProgress / HERO_GOAL) * 100)),
        [heroProgress],
    );

    const DAILY_GOAL_XP = 10;
    const [dailyXP, setDailyXP] = useState(2);
    const dailyPct = useMemo(
        () => Math.min(100, Math.round((dailyXP / DAILY_GOAL_XP) * 100)),
        [dailyXP],
    );

    const moods = [
        { emoji: '😡', label: 'Sangat Buruk' },
        { emoji: '😟', label: 'Buruk' },
        { emoji: '😐', label: 'Netral' },
        { emoji: '🙂', label: 'Baik' },
        { emoji: '😄', label: 'Sangat Baik' },
    ];
    const [selectedMood, setSelectedMood] = useState<number | null>(null);

    // Pixel/arcade greeting bubble component
    function PixelGreeting({ username }: { username: string }) {
        return (
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-sidebar-border/60 bg-[repeating-linear-gradient(45deg,#0000_0_8px,#ffffff10_8px_16px)]">
                    <Ghost className="size-5 opacity-80" />
                </div>
                <div className="relative flex-1">
                    <div className="relative rounded-xl border border-sidebar-border/60 bg-sidebar px-4 py-2 text-[13px] font-medium text-foreground shadow-sm after:absolute after:top-3 after:left-[-8px] after:h-0 after:w-0 after:border-y-6 after:border-r-8 after:border-y-transparent after:border-r-sidebar-border/60 after:content-['']">
                        <span>Howdy @{username}! How are you feeling?</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AppLayout
            // leftActions removed per request (hapus tulisan "hai zakiyh")
            rightActions={
                <div className="flex items-center gap-2">
                    <Link
                        href={shop().url}
                        className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 px-3 py-2 text-sm hover:bg-muted/60 dark:border-sidebar-border"
                    >
                        <ShoppingCart className="size-4" />
                        <span className="hidden sm:inline">Shop</span>
                    </Link>

                    <Link
                        href={missions().url}
                        className="inline-flex items-center gap-2 rounded-lg border border-sidebar-border/70 px-3 py-2 text-sm hover:bg-muted/60 dark:border-sidebar-border"
                    >
                        <Flag className="size-4" />
                        <span className="hidden sm:inline">Mission</span>
                    </Link>

                    <Link
                        href={profile().url}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
                    >
                        <User className="size-4" />
                        <span className="hidden sm:inline">Profile</span>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-4 p-4 md:grid-cols-3">
                {/* Main column */}
                <div className="space-y-4 md:col-span-2">
                    {/* Pixel greeting placed directly above "Jump back in" */}
                    <PixelGreeting username={name} />

                    {/* Hero: Jump back in */}
                    <div className="rounded-xl border-2 border-sidebar-border/80 bg-card p-3 shadow-[0_0_0_4px_rgba(9,9,16,0.4)]">
                        <div className="relative overflow-hidden rounded-lg border border-sidebar-border/80">
                            {/* Banner image uses intrinsic ratio; container follows image height */}
                            <img
                                src="/images/mentoring/chapter_1/main_banner.png"
                                alt="Python Course Banner"
                                className="block h-auto w-full"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            {/* Subtle gradient for text contrast (no black box, no blur) */}
                            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />

                            {/* Top-left overlay: progress + labels */}
                            <div className="absolute top-4 left-4 z-30 text-white">
                                <div className="mb-2 h-3 w-28 overflow-hidden rounded-sm border border-white/40 bg-white/20 sm:w-36">
                                    <div
                                        className="h-full bg-white"
                                        style={{ width: `${heroPct}%` }}
                                    />
                                </div>
                                <p className="text-[10px] font-semibold tracking-wide opacity-90">
                                    COURSE
                                </p>
                                <h2 className="text-xl font-extrabold drop-shadow-md sm:text-2xl">
                                    Python
                                </h2>
                                <p className="text-sm opacity-90">
                                    Next exercise: Initals
                                </p>
                            </div>

                            {/* Top-right chip */}
                            <div className="absolute top-4 right-4 hidden items-center gap-2 rounded-md border border-emerald-300/60 bg-emerald-400/20 px-2 py-1 text-xs text-emerald-100 md:flex">
                                <ShieldCheck className="size-4" />
                                <span className="font-mono">Arcade</span>
                            </div>

                            {/* Bottom-left buttons styled arcade */}
                            <div className="absolute bottom-4 left-4 z-30 flex flex-wrap items-center gap-3">
                                <Link href={mentoring().url} prefetch>
                                    <Button className="rounded-sm bg-sky-500 text-white shadow-[0_2px_0_0_rgba(0,0,0,0.45)] ring-2 ring-sky-300 hover:bg-sky-600">
                                        Continue Learning
                                    </Button>
                                </Link>
                                <Link href={shop().url} prefetch>
                                    <Button
                                        variant="outline"
                                        className="rounded-sm border-white/30 bg-black/40 text-white hover:bg-black/60"
                                    >
                                        View course
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Explore more */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold">Explore more</p>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-yellow-400/40 bg-yellow-400/10">
                                    <Puzzle className="size-5 text-yellow-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Challenge Packs
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Prove what you learned with bite-sized
                                        code challenges.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-blue-400/40 bg-blue-400/10">
                                    <BookOpen className="size-5 text-blue-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Project Tutorials
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Explore fun, step-by-step projects from
                                        first build to pro.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-400/10">
                                    <Egg className="size-5 text-emerald-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        #30NitesOfCode
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Commit to 30 days of learning with a
                                        virtual pet.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl border border-sidebar-border/70 bg-card p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-fuchsia-400/40 bg-fuchsia-400/10">
                                    <HeartHandshake className="size-5 text-fuchsia-300" />
                                </div>
                                <Link
                                    href="/mental-health-chat"
                                    className="flex-1"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Teman Cerita AI
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Tempat aman untuk berbagi pikiran
                                            dan perasaanmu.
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
                        <div className="flex items-center gap-3">
                            <Trophy className="size-5 text-yellow-400" />
                            <div>
                                <p className="text-sm font-semibold">
                                    Buka Papan Skor!
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Selesaikan 10 pelajaran lagi untuk mulai
                                    berkompetisi
                                </p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Link href={mentoring().url} prefetch>
                                <Button className="w-full rounded-sm">
                                    Mulai Pelajaran
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-yellow-400/40 bg-yellow-400/10">
                                    <Zap className="size-4 text-yellow-300" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        Dapatkan {DAILY_GOAL_XP} XP
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Misi Harian
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="size-4" />2 JAM
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="relative h-3 w-full overflow-hidden rounded-md border border-sidebar-border/60 bg-muted">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                                    style={{ width: `${dailyPct}%` }}
                                />
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0000_0_8px,#ffffff10_8px_16px)]" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="font-mono text-xs text-muted-foreground">
                                    {dailyXP} / {DAILY_GOAL_XP}
                                </span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="rounded-sm"
                                    onClick={() =>
                                        setDailyXP((v) =>
                                            Math.min(DAILY_GOAL_XP, v + 2),
                                        )
                                    }
                                >
                                    Kerjakan
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 bg-card p-4">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold">
                                Mood Tracker
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="rounded-sm">
                                        Buka
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-lg sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Bagaimana Mood mu hari ini?
                                        </DialogTitle>
                                        <DialogDescription>
                                            Pilih satu emoji untuk
                                            merepresentasikan suasana hati.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                                        {moods.map((mood, i) => (
                                            <button
                                                key={mood.label}
                                                type="button"
                                                aria-label={mood.label}
                                                onClick={() =>
                                                    setSelectedMood(i)
                                                }
                                                className={
                                                    'flex items-center justify-center rounded-md border border-sidebar-border/60 bg-muted/40 p-3 transition hover:bg-muted/60 focus:ring-2 focus:ring-ring focus:outline-hidden ' +
                                                    (selectedMood === i
                                                        ? 'bg-indigo-500/10 ring-2 ring-indigo-500'
                                                        : '')
                                                }
                                            >
                                                <span className="text-3xl leading-none">
                                                    {mood.emoji}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

/* mood state moved inside component */
