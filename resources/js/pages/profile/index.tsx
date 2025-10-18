import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Profile', href: route('profile') },
];

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
};

export default function ProfilePage() {
    const { auth } = usePage<SharedProps>().props;
    const email = auth?.user?.email ?? 'Belum tersedia';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile" />

            <div className="space-y-4 p-6">
                <h1 className="text-2xl font-semibold">Your Profile</h1>
                <p className="text-muted-foreground">
                    Halaman ini nantinya akan menampilkan informasi kesehatan
                    mental, progress misi, dan insight kamu.
                </p>

                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">
                        👋 Hai, <strong>User</strong>! Ini contoh layout dasar
                        untuk halaman profile kamu.
                    </p>
                    <br />
                    <p className="text-sm text-muted-foreground">
                        Email saat ini <strong>{email}</strong>
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
