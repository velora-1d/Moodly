import LevelLayout from './LevelLayout'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { startSession, endSession, complete } from './useLevelState'

type SharedProps = { auth: { user: { id: number } | null } }

const items = ['Minum air','Cahaya pagi','Gerak ringan','Tulis niat','Fokus satu tugas']

export default function Level3() {
  const { auth } = usePage<SharedProps>().props
  const levelId = 3
  const [checked, setChecked] = useState<boolean[]>(items.map(()=>false))

  useEffect(() => { if (auth?.user?.id) startSession(auth.user.id, levelId) }, [auth?.user?.id])

  function toggle(i:number){ setChecked(prev=> prev.map((v,idx)=> idx===i ? !v : v)) }

  async function finish(){
    const done = checked.filter(Boolean).length
    if (auth?.user?.id){
      await endSession(auth.user.id, levelId, { items, checked }, 0)
      const stars = done>=5 ? 3 : done>=4 ? 2 : 1
      await complete(auth.user.id, levelId, stars, 50)
    }
  }

  return (
    <LevelLayout title="Level 3 · Pagi Produktif">
      <div className="bg-white rounded-2xl border border-purple-100 p-6">
        <div className="space-y-3">
          {items.map((label,i)=> (
            <label key={i} className="flex items-center gap-3">
              <Checkbox checked={checked[i]} onCheckedChange={()=>toggle(i)} />
              <span className="text-sm font-medium text-gray-900">{label}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={finish}>Selesai</Button>
        </div>
      </div>
    </LevelLayout>
  )
}