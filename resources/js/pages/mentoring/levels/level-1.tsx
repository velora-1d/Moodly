import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, complete } from './useLevelState'

type SharedProps = { auth: { user: { id: number } | null } }

export default function Level1() {
  const { auth } = usePage<SharedProps>().props
  const levelId = 1
  const [phase, setPhase] = useState<'idle'|'inhale'|'hold1'|'exhale'|'hold2'>('idle')
  const [cycles, setCycles] = useState(0)
  const t = useRef<number|null>(null)
  const startTime = useRef<number>(0)

  useEffect(() => { if (auth?.user?.id) startSession(auth.user.id, levelId) }, [auth?.user?.id])

  function next(p: 'inhale'|'hold1'|'exhale'|'hold2') {
    setPhase(p)
    const dur = 4000
    if (t.current!==null) window.clearTimeout(t.current)
    t.current = window.setTimeout(() => {
      if (p==='inhale') return next('hold1')
      if (p==='hold1') return next('exhale')
      if (p==='exhale') return next('hold2')
      if (p==='hold2') {
        const c = cycles+1
        setCycles(c)
        if (c>=4) { finish(); return }
        return next('inhale')
      }
    }, dur)
  }

  function begin() {
    startTime.current = performance.now()
    setCycles(0)
    next('inhale')
  }

  async function finish() {
    if (t.current!==null) window.clearTimeout(t.current)
    setPhase('idle')
    const durationMs = Math.round(performance.now()-startTime.current)
    if (auth?.user?.id) {
      await endSession(auth.user.id, levelId, { cycles }, durationMs)
      const stars = cycles>=4 ? 3 : cycles>=3 ? 2 : 1
      await complete(auth.user.id, levelId, stars, 50)
    }
  }

  const label = useMemo(() => {
    if (phase==='idle') return 'Mulai Box Breathing'
    if (phase==='inhale') return 'Tarik Nafas 4s'
    if (phase==='hold1') return 'Tahan 4s'
    if (phase==='exhale') return 'Buang Nafas 4s'
    return 'Tahan 4s'
  }, [phase])

  return (
    <LevelLayout title="Level 1 · Box Breathing">
      <div className="bg-white rounded-2xl border border-purple-100 p-6">
        <div className="text-sm text-gray-600 mb-4">Lakukan 4 siklus pernapasan 4–4–4–4</div>
        <div className="h-64 flex items-center justify-center">
          <div className={`w-48 h-48 rounded-full ${phase==='inhale'?'bg-green-500':phase==='exhale'?'bg-blue-500':phase==='idle'?'bg-gray-200':'bg-yellow-400'} shadow-lg transition`} />
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={begin} disabled={phase!=='idle'}>Mulai</Button>
          <Button variant="outline" className="border-2 border-purple-300" onClick={finish} disabled={phase==='idle'}>Selesai</Button>
        </div>
        <div className="mt-4 text-sm font-semibold text-gray-900">{label} · Siklus {cycles}/4</div>
      </div>
    </LevelLayout>
  )
}