import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, complete } from './useLevelState'

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
  const [targetBreaths] = useState(8)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [burst, setBurst] = useState(0)
  const [pet, setPet] = useState<Pet>('boat')
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [exhaleFx, setExhaleFx] = useState(0)

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
  }
  function onReset() {
    setPhase('idle')
    setBreaths(0)
    setElapsed(0)
    setStarted(false)
    setStreak(0)
  }

  const guideScale = phase === 'inhale' ? 1.25 : phase === 'exhale' ? 0.9 : 1
  const guideColor = phase === 'inhale' ? '#93c5fd' : phase === 'exhale' ? '#a7f3d0' : '#c7d2fe'
  const guideGlow = streak >= 3 ? `0 0 0 10px ${guideColor}22, 0 0 24px ${guideColor}66` : `0 0 0 8px ${guideColor}22`
  const boatY = phase === 'inhale' ? -24 : phase === 'exhale' ? 24 : 0
  const headline = phase === 'inhale' ? 'Tarik napas / Inhale' : phase === 'exhale' ? 'Hembuskan / Exhale' : 'Siap? / Ready?'
  const message = MESSAGES[Math.min(breaths, MESSAGES.length - 1)]
  const completed = breaths >= targetBreaths

  useEffect(() => {
    if (!completed || !auth?.user?.id) return
    const durationMs = elapsed * 1000
    const stars = bestStreak >= 4 ? 3 : 2
    endSession(auth.user.id, levelId, { breaths, targetBreaths, bestStreak }, durationMs)
    complete(auth.user.id, levelId, stars, 50)
  }, [completed])

  return (
    <LevelLayout title="Level 1 · Latihan Pernapasan">
      <Card className="relative overflow-hidden">
        <motion.div aria-hidden className="absolute inset-0 -z-10" variants={bgVariants} animate={phase} transition={{ duration: 0.6 }} />
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Level 1 · Latihan Pernapasan</CardTitle>
            <CardDescription>
              Tekan Inhale saat menarik napas, Exhale saat menghembuskan. Ritme pelan dan stabil.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{headline}</Badge>
            <Badge>⏱ {formatTime(elapsed)}</Badge>
            <Badge variant={streak >= 3 ? 'default' : 'secondary'}>🔥 Combo x{streak}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="relative mx-auto grid size-[220px] place-items-center sm:size-[260px]">
              <motion.div className="relative grid size-[160px] place-items-center rounded-full border-2" style={{ borderColor: guideColor, boxShadow: guideGlow }} animate={{ scale: guideScale }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
                <span className="text-sm text-muted-foreground">{message}</span>
              </motion.div>
              <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2" animate={{ y: boatY, rotate: phase === 'inhale' ? -2 : phase === 'exhale' ? 2 : 0 }} transition={{ type: 'spring', stiffness: 100, damping: 12 }}>
                <div className="relative">
                  {pet === 'boat' && (
                    <>
                      <div className="absolute -bottom-1 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-200/70 via-sky-300/70 to-sky-200/70 blur-[1px]" />
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-rose-200 to-pink-200 shadow-md"><span className="text-lg">⛵</span></div>
                    </>
                  )}
                  {pet === 'balloon' && (
                    <>
                      <div className="absolute -bottom-3 left-1/2 h-4 w-[2px] -translate-x-1/2 bg-rose-300/70" />
                      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-rose-300 to-pink-200 shadow-md"><span className="text-lg">🎈</span></div>
                    </>
                  )}
                  {pet === 'cat' && (<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-amber-200 to-yellow-200 shadow-md"><span className="text-lg">🐱</span></div>)}
                </div>
              </motion.div>
              <AnimatePresence>
                <motion.span key={exhaleFx} className="absolute bottom-8 left-1/2 text-xl" initial={{ opacity: 0, x: -8, y: 0 }} animate={{ opacity: 0.8, x: 40, y: -30 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                  {phase === 'exhale' ? '💨' : null}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                <ParticleBurst keySeed={burst} />
              </AnimatePresence>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground"><span>Napas selesai / Breaths completed</span><span>{breaths} / {targetBreaths}</span></div>
              <Progress value={progress} />
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Best Combo: {bestStreak}</span><span className="italic">Tip: Tarik 4 hitungan, hembuskan 6.</span></div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onInhale} aria-label="Inhale" className="min-w-24">Inhale</Button>
              <Button onClick={onExhale} aria-label="Exhale" variant="secondary" className="min-w-24">Exhale</Button>
              <Button onClick={onReset} aria-label="Reset" variant="outline">Reset</Button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Buddy:</span>
                <Button size="sm" variant={pet === 'boat' ? 'default' : 'outline'} onClick={() => setPet('boat')}>⛵</Button>
                <Button size="sm" variant={pet === 'balloon' ? 'default' : 'outline'} onClick={() => setPet('balloon')}>🎈</Button>
                <Button size="sm" variant={pet === 'cat' ? 'default' : 'outline'} onClick={() => setPet('cat')}>🐱</Button>
              </div>
            </div>
            {completed && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border bg-secondary/50 p-3 text-center text-sm">
                Sesi selesai! Nafasmu lebih tenang.
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </LevelLayout>
  )
}