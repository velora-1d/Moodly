import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, getCompletion } from './useLevelState'

type SharedProps = { auth: { user: { id: number } | null } }
type Phase = 'idle' | 'inhale' | 'exhale'
type Pet = 'boat' | 'balloon' | 'cat'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const MESSAGES = [
  'Tarik napas perlahan… / Breathe in gently…',
  'Hembuskan perlahan… / Breathe out softly…',
  'Bagus! / Nice!',
  'Ritme yang tenang. / Find your calm rhythm.',
  'Kamu hebat! / You\'re doing great!',
  'Tetap lembut. / Keep it gentle.',
  'Hampir sampai. / Almost there.',
  'Damai. / Peaceful.'
]

const burstColors = ['#93c5fd', '#a7f3d0', '#fbcfe8', '#fde68a', '#c7d2fe']

function ParticleBurst({ keySeed }: { keySeed: number }) {
  const pieces = Array.from({ length: 16 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const x = Math.random() * 100
        const delay = Math.random() * 0.1
        const color = burstColors[i % burstColors.length]
        const size = 6 + Math.random() * 6
        const drift = (Math.random() - 0.5) * 60
        return (
          <motion.span
            key={`${keySeed}-${i}`}
            className="absolute block rounded-full"
            style={{ left: `${x}%`, top: `50%`, width: size, height: size, backgroundColor: color }}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: [0.9, 0.9, 0], y: [-10, -80, -140], x: [0, drift], scale: [0.6, 1, 0.8] }}
            transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

export default function Level1() {
  const { auth } = usePage<SharedProps>().props
  const levelId = 1
  const [phase, setPhase] = useState<Phase>('idle')
  const [breaths, setBreaths] = useState(0)
  const [targetBreaths, setTargetBreaths] = useState(8)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [burst, setBurst] = useState(0)
  const [pet, setPet] = useState<Pet>('boat')
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [exhaleFx, setExhaleFx] = useState(0)
  const [paceSec, setPaceSec] = useState(4)
  const [autoGuide, setAutoGuide] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState<{ breaths: number; targetBreaths: number; bestStreak: number; duration: number; stars: number } | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!started || !auth?.user?.id) return
    startSession(auth.user.id, levelId)
  }, [started, auth?.user?.id])

  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [started])

  const progress = Math.min(100, Math.round((breaths / targetBreaths) * 100))

  const bgVariants = {
    idle: { background: 'radial-gradient(1200px 400px at 50% 20%, rgba(147,197,253,0.25), rgba(167,243,208,0.15))' },
    inhale: { background: 'radial-gradient(1200px 400px at 50% 20%, rgba(147,197,253,0.35), rgba(199,210,254,0.2))' },
    exhale: { background: 'radial-gradient(1200px 400px at 50% 20%, rgba(167,243,208,0.35), rgba(252,211,77,0.15))' }
  }

  function playDing() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const ctx = audioCtxRef.current
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = 880
      o.connect(g)
      g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
      o.start()
      o.stop(ctx.currentTime + 0.12)
    } catch { }
  }

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close()
      } catch { }
      audioCtxRef.current = null
    }
  }, [])

  function onInhale() {
    if (!started) setStarted(true)
    setPhase('inhale')
  }
  function onExhale() {
    if (!started) setStarted(true)
    setBreaths((b) => {
      setExhaleFx((n) => n + 1)
      if (phase === 'inhale') {
        setBurst((k) => k + 1)
        setStreak((s) => {
          const ns = s + 1
          setBestStreak((bs) => Math.max(bs, ns))
          return ns
        })
        return b + 1
      } else {
        setStreak(0)
        return b
      }
    })
    setPhase('exhale')
    if (audioEnabled) playDing()
  }
  function onReset() {
    setPhase('idle')
    setBreaths(0)
    setElapsed(0)
    setStarted(false)
    setStreak(0)
    setHasCompleted(false)
  }

  const guideScale = phase === 'inhale' ? 1.25 : phase === 'exhale' ? 0.9 : 1
  const guideColor = phase === 'inhale' ? '#93c5fd' : phase === 'exhale' ? '#a7f3d0' : '#c7d2fe'
  const guideGlow = streak >= 3 ? `0 0 0 10px ${guideColor}22, 0 0 24px ${guideColor}66` : `0 0 0 8px ${guideColor}22`
  const boatY = phase === 'inhale' ? -24 : phase === 'exhale' ? 24 : 0
  const headline = phase === 'inhale' ? 'Tarik napas / Inhale' : phase === 'exhale' ? 'Hembuskan / Exhale' : 'Siap? / Ready?'
  const message = MESSAGES[Math.min(breaths, MESSAGES.length - 1)]
  const completed = breaths >= targetBreaths

  useEffect(() => {
    if (!completed || hasCompleted || !auth?.user?.id) return
    setHasCompleted(true)
    const durationMs = elapsed * 1000
    const stars = bestStreak >= 4 ? 3 : 2
    endSession(auth.user.id, levelId, { breaths, targetBreaths, bestStreak, paceSec, autoGuide }, durationMs)
      ; (async () => {
        // Supabase logic removed
        // Simulate saving progress locally if needed
      })()
    setSummary({ breaths, targetBreaths, bestStreak, duration: elapsed, stars })
    setShowSummary(true)
  }, [completed, hasCompleted, auth?.user?.id, elapsed, bestStreak, breaths, targetBreaths, paceSec, autoGuide])

  useEffect(() => {
    if (!autoGuide) return
    if (!started) setStarted(true)
    let current: Phase = 'inhale'
    setPhase('inhale')
    const id = setInterval(() => {
      if (current === 'inhale') {
        setPhase('exhale')
        setBreaths((b) => {
          setExhaleFx((n) => n + 1)
          setBurst((k) => k + 1)
          setStreak((s) => {
            const ns = s + 1
            setBestStreak((bs) => Math.max(bs, ns))
            return ns
          })
          return b + 1
        })
        if (audioEnabled) playDing()
        current = 'exhale'
      } else {
        setPhase('inhale')
        setStreak(0)
        if (audioEnabled) playDing()
        current = 'inhale'
      }
    }, paceSec * 1000)
    return () => clearInterval(id)
  }, [autoGuide, paceSec, audioEnabled, started])

  useEffect(() => {
    const key = `level1:${auth?.user?.id ?? 'anon'}`
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const p = JSON.parse(raw)
        if (p.pet) setPet(p.pet)
        if (p.targetBreaths) setTargetBreaths(p.targetBreaths)
        if (p.paceSec) setPaceSec(p.paceSec)
        setAudioEnabled(!!p.audioEnabled)
      }
    } catch { }
  }, [auth?.user?.id])

  useEffect(() => {
    const key = `level1:${auth?.user?.id ?? 'anon'}`
    try {
      localStorage.setItem(key, JSON.stringify({ pet, targetBreaths, paceSec, audioEnabled }))
    } catch { }
  }, [pet, targetBreaths, paceSec, audioEnabled, auth?.user?.id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'i') onInhale()
      else if (k === 'e') onExhale()
      else if (k === 'r') onReset()
      else if (k === 's') setAutoGuide((v) => !v)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

    return (
    <LevelLayout title="Level 1 · Latihan Pernapasan">
      <div className="relative min-h-[600px] flex items-center justify-center p-4">
        {/* Animated Background Layers */}
        <motion.div 
          aria-hidden 
          className="absolute inset-0 -z-20 overflow-hidden rounded-3xl" 
          animate={{
            background: phase === 'inhale' 
              ? 'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0.1) 100%)' 
              : phase === 'exhale'
              ? 'radial-gradient(circle at 50% 50%, rgba(167, 243, 208, 0.4) 0%, rgba(167, 243, 208, 0.1) 100%)'
              : 'radial-gradient(circle at 50% 50%, rgba(199, 210, 254, 0.2) 0%, rgba(199, 210, 254, 0.05) 100%)'
          }}
          transition={{ duration: 1.5 }}
        />

        <Card className="w-full max-w-2xl bg-white/40 backdrop-blur-xl border-white/40 shadow-2xl relative z-10 overflow-hidden rounded-3xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-white/60 text-purple-700 px-3 py-1 text-xs">⏱ {formatTime(elapsed)}</Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 text-xs">🔥 Streak x{streak}</Badge>
            </div>
            <CardTitle className="text-2xl font-black bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {headline}
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium max-w-sm mx-auto">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-12 pb-10">
            {/* Main Interactive Circle */}
            <div className="relative flex justify-center py-10">
              {/* Outer Glow Ring */}
              <AnimatePresence>
                {phase === 'inhale' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0.3 }}
                    exit={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: paceSec, ease: "linear" }}
                    className="absolute size-[180px] sm:size-[220px] rounded-full bg-blue-400 blur-3xl"
                  />
                )}
                {phase === 'exhale' && (
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0.3 }}
                    animate={{ scale: 0.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: paceSec, ease: "linear" }}
                    className="absolute size-[180px] sm:size-[220px] rounded-full bg-emerald-400 blur-3xl"
                  />
                )}
              </AnimatePresence>

              {/* Breathing Guide Circle */}
              <motion.div 
                className="relative size-[180px] sm:size-[220px] grid place-items-center rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-inner overflow-hidden"
                animate={{ 
                  scale: phase === 'inhale' ? 1.3 : phase === 'exhale' ? 0.9 : 1,
                  boxShadow: streak >= 3 ? "0 0 40px rgba(168, 85, 247, 0.4)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: paceSec, ease: "easeInOut" }}
              >
                {/* Visual Pet Companion */}
                <motion.div 
                  className="z-20 text-5xl"
                  animate={{ 
                    y: phase === 'inhale' ? -20 : phase === 'exhale' ? 20 : 0,
                    rotate: phase === 'inhale' ? -5 : phase === 'exhale' ? 5 : 0,
                    scale: phase === 'inhale' ? 1.1 : 1
                  }}
                  transition={{ duration: paceSec, ease: "easeInOut" }}
                >
                  {pet === 'boat' ? '⛵' : pet === 'balloon' ? '🎈' : '🐱'}
                </motion.div>

                {/* Progress Wave Overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500/10 pointer-events-none"
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              <AnimatePresence>
                {phase === 'exhale' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], y: 100, scale: 2, filter: 'blur(10px)' }}
                    transition={{ duration: 1.5 }}
                    className="absolute pointer-events-none text-4xl"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              <ParticleBurst keySeed={burst} />
            </div>

            {/* Controls and Feedback */}
            <div className="space-y-8 px-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Proses Sesi</span>
                  <span>{breaths} / {targetBreaths}</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex gap-2">
                  <Button 
                    onClick={onInhale} 
                    className="flex-1 sm:flex-none h-14 w-full sm:w-32 bg-white hover:bg-white/90 text-gray-900 border-b-4 border-gray-200 hover:border-gray-300 transition-all rounded-2xl font-bold shadow-lg shadow-gray-200/50"
                  >
                    Tarik Napas
                  </Button>
                  <Button 
                    onClick={onExhale} 
                    variant="secondary"
                    className="flex-1 sm:flex-none h-14 w-full sm:w-32 bg-gray-900 hover:bg-gray-800 text-white border-b-4 border-black transition-all rounded-2xl font-bold shadow-lg shadow-gray-900/20"
                  >
                    Hembuskan
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 bg-white/60 p-2 rounded-2xl backdrop-blur-sm border border-white/80 shadow-sm">
                  <span className="text-[10px] font-black uppercase text-gray-400 px-2">Teman:</span>
                  <div className="flex gap-1">
                    {['boat', 'balloon', 'cat'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPet(p as Pet)}
                        className={`size-10 rounded-xl transition-all flex items-center justify-center text-xl ${pet === p ? 'bg-purple-100 border-2 border-purple-400 scale-110' : 'bg-transparent hover:bg-white border-2 border-transparent'}`}
                      >
                        {p === 'boat' ? '⛵' : p === 'balloon' ? '🎈' : '🐱'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Settings Glass Sheet */}
              <div className="bg-gray-900/5 p-6 rounded-3xl border border-white/40 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Kecepatan</label>
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 rounded-md">{paceSec} Detik</span>
                    </div>
                    <input 
                      type="range" 
                      min={3} 
                      max={6} 
                      value={paceSec} 
                      onChange={(e) => setPaceSec(Number(e.target.value))} 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" 
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="auto"
                          checked={autoGuide} 
                          onChange={(e) => setAutoGuide(e.target.checked)} 
                          className="size-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="auto" className="text-xs font-bold text-gray-600">Otomatis</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="audio"
                          checked={audioEnabled} 
                          onChange={(e) => setAudioEnabled(e.target.checked)} 
                          className="size-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="audio" className="text-xs font-bold text-gray-600">Suara</label>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-gray-500">Target</label>
                      <input 
                        type="number" 
                        min={4} 
                        max={16} 
                        value={targetBreaths} 
                        onChange={(e) => setTargetBreaths(Math.max(4, Math.min(16, Number(e.target.value))))} 
                        className="h-8 w-12 rounded-lg bg-white border border-gray-200 text-center text-xs font-bold focus:ring-2 focus:ring-purple-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <Button 
            onClick={onReset} 
            variant="ghost" 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-white/40"
          >
            Reset
          </Button>
        </Card>
      </div>

      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="rounded-[40px] border-white/60 bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 max-w-sm sm:max-w-md mx-auto">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mx-auto size-24 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-[30px] shadow-xl shadow-purple-200 flex items-center justify-center mb-6"
            >
              <Star className="size-12 text-white fill-white" />
            </motion.div>
            <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight">
              Sesi Hebat!
            </DialogTitle>
            <p className="text-gray-500 font-medium">Kamu semakin tenang hari ini.</p>
          </DialogHeader>
          
          {summary && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50/80 rounded-3xl p-5 border border-white text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pernapasan</p>
                  <p className="text-2xl font-black text-gray-900">{summary.breaths}/{summary.targetBreaths}</p>
                </div>
                <div className="bg-gray-50/80 rounded-3xl p-5 border border-white text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Durasi</p>
                  <p className="text-2xl font-black text-gray-900">{formatTime(summary.duration)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl shadow-indigo-100">
                <div className="flex flex-col flex-1">
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Best Streak</p>
                  <p className="text-4xl font-black">{summary.bestStreak}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 text-sm font-bold">
                  +50 XP
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-black shadow-lg shadow-gray-200"
                  onClick={onReset}
                >
                  Ulangi
                </Button>
                <a 
                  href="/mentoring" 
                  className="flex-1 h-14 bg-white hover:bg-gray-50 text-gray-600 border border-gray-100 rounded-2xl font-bold flex items-center justify-center shadow-sm"
                >
                  Selesai
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LevelLayout>
  )
}
