import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession } from './useLevelState'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Activity, CheckCircle2 } from 'lucide-react'

type SharedProps = { auth: { user: { id: number } | null } }

const PARTS = [
    { id: 'head', name: 'Kepala & Wajah', icon: '👤' },
    { id: 'shoulders', name: 'Bahu & Leher', icon: '🧘' },
    { id: 'chest', name: 'Dada & Jantung', icon: '❤️' },
    { id: 'arms', name: 'Lengan & Tangan', icon: '💪' },
    { id: 'stomach', name: 'Perut', icon: '🌀' },
    { id: 'legs', name: 'Kaki', icon: '🦵' },
];

export default function Level5() {
    const { auth } = usePage<SharedProps>().props
    const levelId = 5
    const [currentIndex, setCurrentIndex] = useState(0)
    const [scanned, setScanned] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        if (auth?.user?.id) startSession(auth.user.id, levelId)
    }, [auth?.user?.id])

    const handleScan = () => {
        setLoading(true)
        setTimeout(() => {
            setScanned(prev => [...prev, PARTS[currentIndex].id])
            setLoading(false)
            if (currentIndex < PARTS.length - 1) {
                setCurrentIndex(prev => prev + 1)
            }
        }, 1500)
    }

    async function finish() {
        if (auth?.user?.id) {
            // The instruction for Level 5 says "tetap 3 bintang" (remain 3 stars).
            // The original code already sets stars: 3.
            // If the intention was to use a dynamic star calculation based on 'count'
            // as seen in the provided snippet, 'count' would need to be defined.
            // Assuming 'scanned.length' is the 'count' for this level,
            // and 'payload' is { scannedCount: scanned.length }.
            const count = scanned.length;
            const stars = count >= PARTS.length ? 3 : count >= PARTS.length - 1 ? 2 : 1; // Example dynamic star logic
            const payload = { scannedCount: count };

            await endSession(auth.user.id, levelId, { ...payload, stars }, 0)
            setIsCompleted(true)
        }
    }

    const currentPart = PARTS[currentIndex]
    const progress = (scanned.length / PARTS.length) * 100

    return (
        <LevelLayout title="Level 5 · Body Scan">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl border-2 border-pink-100 p-8 shadow-xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Body Scan Meditation</h2>
                        <p className="text-gray-600">Terima sensasi di setiap bagian tubuhmu tanpa menghakiminya.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left Side: Body Diagram Placeholder */}
                        <div className="relative aspect-[3/4] bg-pink-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-pink-200">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-9xl"
                                >
                                    {currentPart.icon}
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Right Side: Controls */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-1">Area Fokus</h3>
                                <div className="text-2xl font-black text-gray-900">{currentPart.name}</div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                    <span>SCAN PROGRESS</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-pink-500"
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {!isCompleted ? (
                                <div className="pt-4">
                                    {scanned.length < PARTS.length ? (
                                        <Button
                                            onClick={handleScan}
                                            disabled={loading}
                                            className={`w-full h-16 rounded-2xl text-lg font-bold shadow-lg transition-all ${loading
                                                    ? 'bg-gray-200 text-gray-400'
                                                    : 'bg-pink-500 hover:bg-pink-600 text-white'
                                                }`}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <Activity className="w-5 h-5 animate-spin" />
                                                    Scanning...
                                                </div>
                                            ) : 'Scan Area Ini 🧘'}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={finish}
                                            className="w-full h-16 rounded-2xl text-lg font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg"
                                        >
                                            Selesaikan Latihan ✨
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-100"
                                >
                                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <div className="font-bold text-green-800">Scan Complete!</div>
                                    <p className="text-xs text-green-600 mb-4">Tubuhmu sekarang lebih rileks.</p>
                                    <a href="/mentoring" className="block w-full py-2 bg-green-500 text-white rounded-xl text-sm font-bold">Kembali</a>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LevelLayout>
    )
}
