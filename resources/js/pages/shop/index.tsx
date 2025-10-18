import AppLayout from '@/layouts/app-layout';
import { dashboard, shop as shopRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Shop', href: shopRoute().url },
];

export default function ShopPage() {
    const items = [
        {
            id: 1,
            name: 'Mood Journal Pro',
            desc: 'Template jurnal premium',
            price: 49000,
        },
        {
            id: 2,
            name: 'Breathing Pack',
            desc: 'Panduan 4-7-8 & box breathing',
            price: 29000,
        },
        {
            id: 3,
            name: 'Mindfulness Audio',
            desc: 'Audio 10 menit fokus napas',
            price: 39000,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shop" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Shop</h1>
                    <p className="text-muted-foreground">
                        Dapatkan item pendukung kesehatan mental kamu ✨
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((it) => (
                        <div
                            key={it.id}
                            className="rounded-xl border border-sidebar-border/70 bg-card p-4 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="mb-2 text-base font-medium">
                                {it.name}
                            </div>
                            <p className="mb-4 text-sm text-muted-foreground">
                                {it.desc}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">
                                    Rp {it.price.toLocaleString('id-ID')}
                                </span>
                                <Link
                                    href="#"
                                    className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
                                >
                                    Beli
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
