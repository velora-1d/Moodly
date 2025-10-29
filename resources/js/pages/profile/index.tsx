import { useEffect, useState } from "react";
import AppLayout from '@/layouts/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Pencil, Loader2 } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Profile', href: route('profile') },
];

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

    const name = auth?.user?.name ?? 'Player One';
    const email = auth?.user?.email ?? 'user@example.com';
    const handle = `@${(email.split('@')[0] || 'player').replace(/[^a-zA-Z0-9_]/g, '')}`;

    const stats = [
        { label: 'EXERCISES', value: 2 },
        { label: 'TOTAL XP', value: 20 },
        { label: 'COURSE BADGES', value: 0 },
        { label: 'DAILY STREAK', value: 2 },
    ];

    // State untuk grafik mood
    const [moodData, setMoodData] = useState<MoodLog[]>([]);
    const [loadingMood, setLoadingMood] = useState(true);

    useEffect(() => {
        const fetchMoods = async () => {
            setLoadingMood(true);

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("User not logged in");
                setLoadingMood(false);
                return;
            }
            const userId = auth?.user?.id; 
            const { data, error } = await supabase
                .from("mood_logs")
                .select("created_at, mood")
                .eq("user_id", userId) // cocok dengan bigint
                .order("created_at", { ascending: true });

            if (error) console.error("Error fetching moods:", error);
            else setMoodData(data || []);

            setLoadingMood(false);
        };

        fetchMoods();
    }, []);

    const chartData = moodData.map((log) => ({
        date: new Date(log.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
        }),
        score: moodToScore[log.mood] ?? 0,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />
            

            <div className="space-y-6 p-6">
                {/* Header banner */}
                <div className="relative overflow-hidden rounded-lg border border-sidebar-border/60 bg-gradient-to-r from-indigo-600/20 via-fuchsia-600/10 to-emerald-600/20 dark:from-indigo-400/15 dark:via-fuchsia-400/10 dark:to-emerald-400/15">
                    <div className="h-36 w-full bg-[repeating-linear-gradient(45deg,#0000_0_10px,#ffffff08_10px_20px)] dark:bg-[repeating-linear-gradient(45deg,#0000_0_10px,#ffffff10_10px_20px)]" />

                    {/* Avatar */}
                    <div className="absolute left-4 bottom-4 flex items-center gap-4">
                        <Avatar className="h-14 w-14 overflow-hidden rounded-full ring-4 ring-black/5 dark:ring-white/10">
                            <AvatarImage src={auth?.user?.avatar} alt={name} />
                            <AvatarFallback className="rounded-full bg-neutral-800 text-white dark:bg-neutral-700">
                                {name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="leading-tight">
                            <p className="text-lg font-semibold text-foreground">{name}</p>
                            <p className="text-sm text-muted-foreground">{handle}</p>
                            <p className="text-xs text-muted-foreground">0 following • 0 followers</p>
                        </div>
                    </div>

                    {/* Edit Profile */}
                    <div className="absolute right-4 bottom-4">
                        <Link href={route('profile.edit')} as="button" className="inline-flex items-center gap-2">
                            <Button variant="outline" className="rounded-sm border-sidebar-border/70 bg-background/50 text-foreground">
                                <Pencil className="size-4" />
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Body */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left: Bio */}
                    <div className="space-y-4">
                        <div className="rounded-lg border border-sidebar-border/70 bg-muted/40 p-4 dark:bg-muted/20">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-yellow-300">
                                <span className="font-mono text-xs">Lvl 1</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                You don't have anything in your bio. Go to account and edit profile to add something cool about yourself.
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                                Joined {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>

                        {/* Pet Café */}
                        <div className="rounded-lg border border-sidebar-border/70 bg-neutral-900 p-4 text-center dark:bg-neutral-800">
                            <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-md border border-neutral-700 bg-black/30 shadow-inner">
                                <span className="text-5xl">🥚</span>
                            </div>
                            <p className="font-mono text-sm text-foreground">Adopt a buddy</p>
                        </div>
                    </div>

                    {/* Middle: Pinned */}
                    <div className="rounded-lg border border-sidebar-border/70 bg-muted/40 p-4 text-center md:col-span-1 dark:bg-muted/20">
                        <p className="font-mono text-sm text-muted-foreground">Pin a project</p>
                    </div>

                    {/* Right: Stats + Tabs + Mood Chart */}
                    <div className="space-y-4 md:col-span-1">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-lg border border-sidebar-border/70 bg-background/60 p-4 text-center shadow-sm"
                                >
                                    <p className="font-mono text-xs tracking-widest text-muted-foreground">{s.label}</p>
                                    <p className="mt-1 font-mono text-3xl text-foreground">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tabs-like counters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="rounded-sm border border-sidebar-border/70 px-3 py-1 text-xs text-muted-foreground">Posts (0)</div>
                            <div className="rounded-sm border border-sidebar-border/70 px-3 py-1 text-xs text-muted-foreground">Projects (0)</div>
                            <div className="rounded-sm border border-sidebar-border/70 px-3 py-1 text-xs text-muted-foreground">Certificates</div>
                        </div>

                        {/* Mood Chart */}
                        <Card className="rounded-lg border border-sidebar-border/70 shadow-sm">
                            <CardHeader>
                                <h3 className="text-sm font-semibold text-foreground">Grafik Mood Kamu</h3>
                            </CardHeader>
                            <CardContent>
                                {loadingMood ? (
                                    <div className="flex items-center justify-center py-10">
                                        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                                    </div>
                                ) : moodData.length === 0 ? (
                                    <p className="text-center text-gray-500 py-6">
                                        Belum ada data mood 😴
                                    </p>
                                ) : (
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                                            <Tooltip
                                                formatter={(value: number) => {
                                                    const mood = Object.keys(moodToScore).find(
                                                        (key) => moodToScore[key] === value
                                                    );
                                                    return [mood, "Mood"];
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#4f46e5"
                                                strokeWidth={3}
                                                dot={{ r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                            </CardContent>
                        </Card>

                        {/* Empty state message */}
                        <div className="rounded-lg border border-sidebar-border/70 bg-muted/40 p-4 text-center dark:bg-muted/20">
                            <p className="text-sm text-muted-foreground">You have not made a post yet.</p>
                            <p className="text-sm text-muted-foreground">
                                Say hi in the <Link href={route('home')} className="underline">community</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
