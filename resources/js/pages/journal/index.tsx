"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile, Meh, Frown, CloudRain, Sun, Moon, Calendar, Trash2, PenLine, Sparkles } from "lucide-react";
import DashboardTopNav from "@/components/dashboard-top-nav";
import { usePage, router } from "@inertiajs/react";
import { toast } from "sonner";
import { route } from 'ziggy-js';

type Mood = "happy" | "neutral" | "sad" | "calm" | "energetic" | "anxious";

interface JournalEntry {
  id: string;
  content: string;
  mood: Mood;
  timestamp: number;
}

const moodIcons: Record<Mood, React.ReactNode> = {
  happy: <Smile className="w-6 h-6" />,
  neutral: <Meh className="w-6 h-6" />,
  sad: <Frown className="w-6 h-6" />,
  calm: <Moon className="w-6 h-6" />,
  energetic: <Sun className="w-6 h-6" />,
  anxious: <CloudRain className="w-6 h-6" />,
};

const moodColors: Record<Mood, string> = {
  happy: "bg-yellow-100 text-yellow-600 border-yellow-200",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
  sad: "bg-blue-100 text-blue-600 border-blue-200",
  calm: "bg-indigo-100 text-indigo-600 border-indigo-200",
  energetic: "bg-orange-100 text-orange-600 border-orange-200",
  anxious: "bg-slate-100 text-slate-600 border-slate-200",
};

const moodLabels: Record<Mood, string> = {
  happy: "Senang",
  neutral: "Biasa",
  sad: "Sedih",
  calm: "Tenang",
  energetic: "Berenergi",
  anxious: "Cemas",
};

export default function JournalingPage() {
  const page = usePage<unknown>();
  const userId: number | undefined = page?.props?.auth?.user?.id;
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<Mood>("calm");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      loadJournals();
    }
  }, [userId]);

  const loadJournals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(route('api.journals.index'));
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Failed to load journals", error);
      toast.error("Gagal memuat jurnal");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentEntry.trim() || !userId) return;

    setIsSaving(true);
    try {
      const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';

      const res = await fetch(route('api.journals.store'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          content: currentEntry,
          mood: selectedMood
        })
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setCurrentEntry("");
        toast.success("Jurnal berhasil disimpan!");
      } else {
        toast.error("Gagal menyimpan jurnal");
      }
    } catch (error) {
      console.error("Failed to save journal", error);
      toast.error("Terjadi kesalahan saat menyimpan jurnal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
      const res = await fetch(route('api.journals.destroy', { id }), {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': token,
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setEntries(entries.filter((entry) => entry.id !== id));
        toast.success("Jurnal dihapus");
      } else {
        toast.error("Gagal menghapus jurnal");
      }
    } catch (error) {
      console.error("Failed to delete journal", error);
      toast.error("Terjadi kesalahan saat menghapus jurnal");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="journaling-ref-theme antialiased min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-200 dark:selection:bg-purple-900/30">
      <DashboardTopNav />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Ruang Personalmu</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Jurnal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Mindpath</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tempat aman untuk melepaskan beban pikiran, merayakan kemenangan kecil, dan memahami dirimu lebih dalam.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <PenLine className="w-5 h-5" />
                  Jurnal Hari Ini
                </CardTitle>
                <CardDescription>Bagaimana perasaanmu saat ini? Ceritakan harimu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Mood Saya</label>
                  <div className="flex flex-wrap gap-2.5">
                    {(Object.keys(moodIcons) as Mood[]).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`${selectedMood === mood ? `${moodColors[mood]} ring-2 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 shadow-md scale-105` : "bg-white dark:bg-slate-800 text-muted-foreground border-transparent hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105"} flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 border`}
                        aria-label={`Select mood: ${moodLabels[mood]}`}
                      >
                        {moodIcons[mood]}
                        <span className="text-xs font-medium">{moodLabels[mood]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Textarea placeholder="Tulis apa yang ada di pikiranmu..." className="min-h-[200px] resize-none border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-950/50 focus:ring-purple-400 text-lg leading-relaxed" value={currentEntry} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentEntry(e.target.value)} disabled={isSaving} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-2 pb-6">
                <Button onClick={handleSave} disabled={!currentEntry.trim() || isSaving} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md transition-all hover:shadow-lg rounded-full px-8">
                  {isSaving ? "Menyimpan..." : "Simpan Jurnal"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" />Riwayat</h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">{entries.length} Catatan</span>
              </div>
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                <div className="space-y-4 pb-4">
                  {isLoading ? (
                    <div className="text-center py-12 text-muted-foreground bg-white/40 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                      <p>Memuat jurnal...</p>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {entries.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-muted-foreground bg-white/40 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                          <p>Belum ada catatan jurnal.</p>
                          <p className="text-sm mt-1">Mulai menulis cerita pertamamu!</p>
                        </motion.div>
                      ) : (
                        entries.map((entry) => (
                          <motion.div key={entry.id} layout variants={itemVariants} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}>
                            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${moodColors[entry.mood]}`}>
                                    {moodIcons[entry.mood]}
                                    {moodLabels[entry.mood]}
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" onClick={() => handleDelete(entry.id)}>
                                    <Trash2 className="h-3 w-3" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                                <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-4 leading-relaxed">{entry.content}</p>
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{formatDate(entry.timestamp)}</div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
