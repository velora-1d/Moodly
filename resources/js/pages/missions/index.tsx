import AppLayout from '@/layouts/app-layout';
import { dashboard, missions } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Missions', href: missions().url },
];

export default function MissionsPage() {
    // Contoh daftar misi sederhana
    const missionList = [
        { id: 1, title: 'Check-in suasana hati hari ini', completed: false },
        { id: 2, title: 'Tuliskan 3 hal yang kamu syukuri', completed: true },
        { id: 3, title: 'Luangkan 5 menit untuk meditasi', completed: false },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Missions" />

            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold">Your Missions</h1>
                <p className="text-muted-foreground">
                    Ini adalah daftar misi keseharianmu untuk menjaga kesehatan
                    mental 🌱
                </p>

                <ul className="space-y-3">
                    {missionList.map((mission) => (
                        <li
                            key={mission.id}
                            className={`flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition ${
                                mission.completed ? 'opacity-60' : ''
                            }`}
                        >
                            <span className="text-sm">{mission.title}</span>
                            <span
                                className={`rounded-md px-2 py-1 text-xs font-medium ${
                                    mission.completed
                                        ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                                }`}
                            >
                                {mission.completed ? 'Selesai' : 'Belum'}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
