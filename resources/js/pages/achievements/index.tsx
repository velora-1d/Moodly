
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardTopNav from '@/components/dashboard-top-nav';
import { ArrowLeft, Trophy, Medal, Star, Target, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

type Achievement = {
    id: number;
    title: string;
    description: string;
    total: number;
    progress: number;
    status: string;
    gradient: string;
    is_completed: boolean;
    percentage: number;
};

export default function AchievementsPage({ achievements }: { achievements: Achievement[] }) {
    const { auth } = usePage<any>().props;

    const totalPoints = achievements.reduce((acc, curr) => acc + (curr.is_completed ? 100 : 0), 0); // Mock points logic
    const completedCount = achievements.filter(a => a.is_completed).length;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Head title="Achievements" />
            <DashboardTopNav />

            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/profile" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Kembali ke Profil
                    </Link>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 mb-2">Pencapaian Kamu</h1>
                            <p className="text-gray-600">Terus berkembang dan buka semua pencapaian!</p>
                        </div>
                        <div className="hidden sm:block">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-2xl">🏆</div>
                                <div>
                                    <div className="text-sm text-gray-500 font-medium">Total Selesai</div>
                                    <div className="text-2xl font-black text-gray-900">{completedCount} <span className="text-gray-400 text-lg">/ {achievements.length}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {achievements.map((a, idx) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${a.is_completed ? 'border-yellow-200 bg-gradient-to-br from-white to-yellow-50/30' : 'border-gray-100 bg-white hover:border-purple-200'
                                }`}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-5">
                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 ${a.is_completed
                                                ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-yellow-200'
                                                : 'bg-gray-100 text-gray-400 grayscale'
                                            }`}>
                                            {a.is_completed ? <Trophy className="w-8 h-8" /> : <Target className="w-8 h-8" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className={`font-bold text-lg leading-tight ${a.is_completed ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {a.title}
                                                </h3>
                                                {a.is_completed && (
                                                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">
                                                        Selesai
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{a.description}</p>

                                            {/* Progress */}
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                    <span>Progress</span>
                                                    <span>{Math.round(a.percentage)}%</span>
                                                </div>
                                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full rounded-full ${a.is_completed ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gray-300'}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${a.percentage}%` }}
                                                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                                    />
                                                </div>
                                                <div className="text-xs text-gray-400 text-right mt-1">
                                                    {a.progress} / {a.total}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
