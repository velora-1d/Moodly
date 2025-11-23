"use client";
import DashboardTopNav from '@/components/dashboard-top-nav';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { encrypt, decrypt, makeCsv, type EncPayload } from '@/lib/crypto';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Calendar, Heart, Flame, Pen, FileDown, Printer, Sparkles, Smile, Target } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type SharedProps = { auth: { user: { id: number; name: string; email: string } | null } };

type Entry = { id: string; userId: number; date: string; type: 'morning'|'gratitude'|'goals'; payload: EncPayload };

function ymd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function lsKey(userId: number) { return `journal:${userId}` }

export default function JournalPage() {
  const { auth } = usePage<SharedProps>().props;
  const user = auth?.user;
  const userId = user?.id ?? 0;
  const name = user?.name ?? 'Teman';

  const [passphrase, setPassphrase] = useState<string>('');
  const [morning, setMorning] = useState<string>('');
  const [gratitude, setGratitude] = useState<string[]>(['','','']);
  const [goals, setGoals] = useState<string>('');
  const [streak, setStreak] = useState<number>(7);
  const [moodOpen, setMoodOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recent, setRecent] = useState<Entry[]>([]);
  const [reminderHour, setReminderHour] = useState<string>(() => localStorage.getItem('journal:reminderHour') || '21');

  useEffect(() => { localStorage.setItem('journal:reminderHour', reminderHour) }, [reminderHour]);

  useEffect(() => {
    const load = async () => {
      const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
      if (userId && isSupabaseConfigured) {
        const { data } = await supabase.from('journal_entries').select('id,user_id,date,type,payload_json').eq('user_id', userId).order('date', { ascending: false }).limit(7);
        const rows = Array.isArray(data) ? data : [];
        setRecent(rows.map((r: any) => ({ id: String(r.id), userId: r.user_id, date: r.date, type: r.type, payload: JSON.parse(r.payload_json) as EncPayload })));
      } else if (userId) {
        try {
          const raw = localStorage.getItem(lsKey(userId));
          const rows = raw ? JSON.parse(raw) as Entry[] : [];
          setRecent(rows.slice().sort((a,b)=>a.date<b.date?1:-1).slice(0,7));
        } catch {}
      }
    };
    load();
  }, [userId]);

  const DAILY_GOAL = 1;
  const dailyPct = useMemo(() => 0, []);

  async function save(type: Entry['type'], content: string) {
    if (!userId || !passphrase || !content.trim()) return;
    const date = ymd(new Date());
    const payload = await encrypt(content.trim(), passphrase);
    const entry: Entry = { id: crypto.randomUUID(), userId, date, type, payload };
    const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
    if (isSupabaseConfigured) {
      await supabase.from('journal_entries').insert({ id: entry.id, user_id: userId, date, type, payload_json: JSON.stringify(payload), created_at: new Date().toISOString() });
    } else {
      const raw = localStorage.getItem(lsKey(userId));
      const rows = raw ? JSON.parse(raw) as Entry[] : [];
      const next = [...rows.filter(r => !(r.userId===userId && r.date===date && r.type===type)), entry];
      localStorage.setItem(lsKey(userId), JSON.stringify(next));
    }
    setRecent(prev => [{...entry}, ...prev.filter(r => !(r.userId===userId && r.date===date && r.type===type))].slice(0,7));
    setStreak(s => Math.max(s, 7));
  }

  async function exportCsv() {
    if (!passphrase) return;
    const rows: Array<{ date: string; type: string; content: string }> = [];
    for (const e of recent) {
      try {
        const plain = await decrypt(e.payload, passphrase);
        rows.push({ date: e.date, type: e.type, content: plain });
      } catch {}
    }
    const csv = makeCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journal-${ymd(new Date())}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printPdf() {
    window.print();
  }

  useEffect(() => {
    const checkReminder = () => {
      const h = Number(reminderHour);
      const now = new Date();
      if (now.getHours() === h && now.getMinutes() === 0) {
        const text = 'Saatnya journaling harian kamu';
        if ('Notification' in window) {
          if (Notification.permission === 'granted') new Notification(text);
        }
      }
    };
    const id = setInterval(checkReminder, 60000);
    return () => clearInterval(id);
  }, [reminderHour]);

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Head title="Daily Journaling" />
      <DashboardTopNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2"><Pen className="w-6 h-6 text-orange-600" /> Daily Journaling</h1>
          <div className="flex items-center gap-2">
            <Input value={passphrase} onChange={(e)=>setPassphrase(e.target.value)} type="password" placeholder="Passphrase enkripsi" aria-label="Passphrase" className="w-56" />
            <Button variant="outline" onClick={exportCsv}><FileDown className="w-4 h-4 mr-1" /> Export CSV</Button>
            <Button onClick={printPdf}><Printer className="w-4 h-4 mr-1" /> Print PDF</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">🌅 Morning Reflection</Badge>
              <div className="text-sm text-gray-600">Bagikan 3 hal: perasaan, fokus hari ini, dan satu niat kebaikan.</div>
              <textarea value={morning} onChange={(e)=>setMorning(e.target.value)} rows={5} className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Morning Reflection" />
              <div className="flex justify-end">
                <Button onClick={()=>save('morning', morning)} className="bg-orange-600 hover:bg-orange-700 text-white">Simpan</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">💭 Gratitude Journal</Badge>
              <div className="grid grid-cols-1 gap-2">
                {gratitude.map((g,i)=> (
                  <Input key={i} value={g} onChange={(e)=>setGratitude(prev=>prev.map((v,idx)=>idx===i?e.target.value:v))} placeholder={`Hal yang disyukuri #${i+1}`} aria-label={`Gratitude ${i+1}`} />
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={()=>save('gratitude', gratitude.filter(x=>x.trim()).join('\n'))} className="bg-rose-600 hover:bg-rose-700 text-white">Simpan</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-gradient-to-r from-teal-500 to-green-600 text-white border-0">🎯 Goal Setting</Badge>
              <Input value={goals} onChange={(e)=>setGoals(e.target.value)} placeholder="Tujuan mingguan" aria-label="Goals" />
              <div className="flex justify-end">
                <Button onClick={()=>save('goals', goals)} className="bg-teal-600 hover:bg-teal-700 text-white">Simpan</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 flex items-center gap-2"><Flame className="w-4 h-4" /> Streak Tracker</Badge>
              <div className="text-2xl font-black">🔥 7 Days Streak!</div>
              <Progress value={70} className="h-3" />
              <div className="text-xs text-gray-600">Target harian: {DAILY_GOAL} entri</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold">Pengingat jam</span>
                <Input value={reminderHour} onChange={(e)=>setReminderHour(e.target.value)} type="number" min={0} max={23} className="w-20" aria-label="Reminder Hour" />
                <Button variant="outline" onClick={()=>{ if ('Notification' in window) Notification.requestPermission(); }}>Aktifkan Notifikasi</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-600" /> Recent Entries</h3>
              </div>
              <div className="space-y-3">
                {recent.map((e)=> (
                  <motion.div key={e.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                    <div className="text-sm font-semibold">{e.date} · {e.type}</div>
                    <Button variant="outline" onClick={async()=>{ if(!passphrase) return; try{ const t = await decrypt(e.payload, passphrase); alert(t); } catch{} }}>Buka</Button>
                  </motion.div>
                ))}
                {!recent.length && (
                  <div className="text-sm text-gray-600">Belum ada entri. Mulai journaling hari ini.</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2"><Smile className="w-5 h-5 text-blue-600" /><h3 className="text-lg font-black">Mood Tracking</h3></div>
              <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Pilih mood">
                {["😡","😟","😐","🙂","😄"].map((m)=> (
                  <button key={m} onClick={()=>setSelectedMood(m)} aria-pressed={selectedMood===m} className={`aspect-square rounded-xl border ${selectedMood===m?"border-blue-600 bg-blue-50":"border-gray-200 hover:bg-gray-50"} text-2xl`}>{m}</button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={async()=>{
                  if (!userId || !selectedMood) return;
                  const isSupabaseConfigured = Boolean((import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL) && (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY));
                  const today = ymd(new Date());
                  if (isSupabaseConfigured) {
                    await supabase.from('mood_logs').insert({ user_id: userId, date: today, created_at: new Date().toISOString(), mood: selectedMood, label: 'journal' });
                  } else {
                    const k = `mood:${userId}`;
                    const raw = localStorage.getItem(k);
                    const rows = raw ? JSON.parse(raw) as Array<{date:string;mood:string}> : [];
                    const next = [...rows.filter(r=>r.date!==today), { date: today, mood: selectedMood }];
                    localStorage.setItem(k, JSON.stringify(next));
                  }
                  setMoodOpen(false);
                }}>Catat Mood</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
