import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession } from './useLevelState'
import { motion } from 'framer-motion'
import { Footprints, CheckCircle2 } from 'lucide-react'

type SharedProps = { auth: { user: { id: number } | null } }

export default function Level4() {
    const { auth } = usePage<SharedProps>().props
    const levelId = 4
    const [steps, setSteps] = useState(0)
    const targetSteps = 10
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        if (auth?.user?.id) startSession(auth.user.id, levelId)
    }, [auth?.user?.id])

    const handleStep = () => {
        if (steps < targetSteps) {
            setSteps(s => s + 1)
        }
    }

    async function finish() {
        if (auth?.user?.id) {
            await endSession(auth.user.id, levelId, { steps }, 0)
            setIsCompleted(true)
        }
    }

    return (
        <LevelLayout title="Level 4 · Meditasi Jalan">
            <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-orange-100 p-8 shadow-xl text-center">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Footprints className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Meditasi Jalan</h2>
                    <p className="text-gray-600 mt-2">Sadari setiap langkahmu. Rasakan sentuhan kaki dengan lantai.</p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-6 mb-8">
                    <div className="text-sm text-orange-700 font-bold mb-2 uppercase tracking-wider">Progress Langkah</div>
                    <div className="text-5xl font-black text-orange-600 mb-4">{steps} / {targetSteps}</div>
                    <div className="h-4 bg-white rounded-full overflow-hidden border-2 border-orange-200">
                        <motion.div
                            className="h-full bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(steps / targetSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {!isCompleted ? (
                    <div className="space-y-4">
                        <Button
                            onClick={handleStep}
                            disabled={steps >= targetSteps}
                            className="w-full h-16 text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg transform active:scale-95 transition-all"
                        >
                            Ambil Langkah 👣
                        </Button>

                        {steps >= targetSteps && (
                            <Button
                                onClick={finish}
                                className="w-full h-16 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg"
                            >
                                Selesaikan Sesi ✨
                            </Button>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl"
                    >
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <h3 className="text-xl font-bold text-green-800">Luar Biasa!</h3>
                        <p className="text-green-700 mb-4">Kamu telah menyelesaikan latihan jalan sadar.</p>
                        <a href="/mentoring" className="inline-block w-full py-3 bg-green-500 text-white font-bold rounded-xl">Kembali ke Menu</a>
                    </motion.div>
                )}
            </div>
        </LevelLayout>
    )
}
