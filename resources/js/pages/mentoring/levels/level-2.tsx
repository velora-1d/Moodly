import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, complete } from './useLevelState'

type SharedProps = { auth: { user: { id: number } | null } }

export default function Level2() {
  const { auth } = usePage<SharedProps>().props
  const levelId = 2
  const [seconds, setSeconds] = useState(300)
  const [running, setRunning] = useState(false)
  const timer = useRef<number|null>(null)
  const startAt = useRef<number>(0)

  useEffect(() => { if (auth?.user?.id) startSession(auth.user.id, levelId) }, [auth?.user?.id])

  function start() {
    setRunning(true)
    startAt.current = performance.now()
    if (timer.current!==null) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => setSeconds((s: number) => s>0 ? s-1 : 0), 1000)
  }

  async function stop() {
    setRunning(false)
    if (timer.current!==null) window.clearInterval(timer.current)
    const durationMs = Math.round(performance.now()-startAt.current)
    if (auth?.user?.id) {
      await endSession(auth.user.id, levelId, { target: 300, left: seconds }, durationMs)
      const done = seconds===0
      const stars = done ? 3 : durationMs>=240000 ? 2 : 1
      await complete(auth.user.id, levelId, stars, 60)
    }
  }

  return (
    <LevelLayout title="Level 2 · Mindfulness">
      <div className="bg-white rounded-2xl border border-purple-100 p-6">
        <div className="text-sm text-gray-600 mb-4">Fokus tenang selama 5 menit</div>
        <div className="text-4xl font-black text-gray-900">{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</div>
        <div className="flex gap-3 mt-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={start} disabled={running}>Mulai</Button>
          <Button variant="outline" className="border-2 border-purple-300" onClick={stop} disabled={!running}>Selesai</Button>
        </div>
      </div>
    </LevelLayout>
  )
}