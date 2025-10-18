import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { missions, profile, shop } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import { Flag, ShoppingCart, User } from 'lucide-react';

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
};

export default function Dashboard() {
    const { auth } = usePage<SharedProps>().props;
    const name = auth?.user?.name ?? '123';

    return (
        <AppLayout
            leftActions={
                <p className="text-sm font-medium text-foreground">
                    👋 Hai, <span className="font-semibold">{name}</span>
                </p>
            }
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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
