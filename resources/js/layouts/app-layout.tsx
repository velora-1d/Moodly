import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type ReactNode } from 'react';

type AppLayoutProps = {
    breadcrumbs?: BreadcrumbItem[];
    leftActions?: ReactNode;
    rightActions?: ReactNode;
    children: ReactNode;
};

export default function AppLayout({
    breadcrumbs,
    leftActions,
    rightActions,
    children,
}: AppLayoutProps) {
    return (
        <div className="flex min-h-dvh flex-col">
            {/* 🔹 Navbar / Header */}
            <header className="sticky top-0 z-20 border-b border-sidebar-border/70 bg-background/80 backdrop-blur-sm dark:border-sidebar-border">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
                    {/* 🔸 kiri: breadcrumb / brand */}
                    <div className="flex min-w-0 items-center gap-2">
                        {leftActions}
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                                {breadcrumbs.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2"
                                    >
                                        <Link
                                            href={item.href}
                                            className="transition-colors hover:text-foreground"
                                        >
                                            {item.title}
                                        </Link>
                                        {idx < breadcrumbs.length - 1 && (
                                            <span>/</span>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* 🔸 kanan: tombol tambahan */}
                    <div className="flex shrink-0 items-center gap-2">
                        {rightActions}
                    </div>
                </div>
            </header>

            {/* 🔹 Isi halaman */}
            <main className="mx-auto w-full max-w-7xl flex-1">{children}</main>
        </div>
    );
}
