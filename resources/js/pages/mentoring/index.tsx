import AppLayout from '@/layouts/app-layout';
import { dashboard, mentoring } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, BookOpen, Trophy } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
  { title: 'Mentoring', href: mentoring().url },
];

// Simple mocked course data
type ExerciseStatus = 'done' | 'start' | 'xp' | 'locked';

type Exercise = { title: string; status: ExerciseStatus; xp?: number };

type Chapter = {
  id: number;
  title: string;
  description: string;
  exercises: Exercise[];
};

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Hello World',
    description:
      'Learn how to write your first line of Python by printing messages to the terminal.',
    exercises: [
      { title: 'Setting Up', status: 'done' },
      { title: 'Hello World', status: 'done' },
      { title: 'Pattern', status: 'xp', xp: 10 },
      { title: 'Initials', status: 'start' },
      { title: 'Snail Mail', status: 'locked' },
      { title: 'Bonus Article', status: 'locked' },
    ],
  },
  {
    id: 2,
    title: 'Variables',
    description:
      'Use and assign values to variables to store and manipulate data.',
    exercises: [
      { title: 'Intro to Variables', status: 'start' },
      { title: 'Types & Casting', status: 'locked' },
      { title: 'Practice', status: 'locked' },
    ],
  },
  {
    id: 3,
    title: 'Control Flow',
    description:
      'Write conditions and loops to control program execution.',
    exercises: [
      { title: 'If/Else', status: 'locked' },
      { title: 'For Loops', status: 'locked' },
      { title: 'While Loops', status: 'locked' },
    ],
  },
];

// Tambah tipe tab untuk navigasi lokal halaman
type TabKey = 'chapters' | 'progress' | 'resources';

function StatusBadge({ exercise }: { exercise: Exercise }) {
  switch (exercise.status) {
    case 'done':
      return <Badge variant="secondary">Done!</Badge>;
    case 'start':
      return (
        <Button size="sm" className="rounded-sm">Start</Button>
      );
    case 'xp':
      return <Badge className="bg-amber-500/90 border-amber-400/70 text-black">+{exercise.xp}XP</Badge>;
    default:
      return <Badge variant="outline">???</Badge>;
  }
}

export default function MentoringPage() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 1: true });
  // State untuk tab aktif
  const [activeTab, setActiveTab] = useState<TabKey>('chapters');

  return (
    <AppLayout breadcrumbs={breadcrumbs}
      rightActions={(
        <div className="flex items-center gap-2">
          <Link href={dashboard()} prefetch>
            <Button variant="outline" className="rounded-sm">Back to Dashboard</Button>
          </Link>
        </div>
      )}
    >
      <Head title="Mentoring" />

      <div className="space-y-6 p-6">
        {/* Hero */}
        <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-emerald-500/20 p-6">
          <div className="flex items-start justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="uppercase">Beginner</Badge>
                <Badge variant="outline" className="uppercase">Course</Badge>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Python</h1>
              <p className="mt-2 text-sm text-muted-foreground">Learn programming fundamentals such as variables, control flow, and loops.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-sidebar-border/60 bg-background/60 px-3 py-2">
              <BookOpen className="size-5" />
              <span className="font-mono text-xs text-muted-foreground">Arcade</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Link href={mentoring()} prefetch>
              <Button className="rounded-sm bg-yellow-400 text-black hover:bg-yellow-500 dark:text-black">Resume Learning</Button>
            </Link>
            <Button variant="outline" className="rounded-sm">Resources</Button>
          </div>
          {/* Tabs lokal halaman */}
          <div className="mt-6 flex items-center gap-2">
            {(['chapters','progress','resources'] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`rounded-sm px-3 py-1.5 text-sm transition-colors ${activeTab === tab ? 'bg-muted' : 'hover:bg-muted/40'}`}
              >
                {tab === 'chapters' && 'Chapters'}
                {tab === 'progress' && 'Progress'}
                {tab === 'resources' && 'Resources'}
              </button>
            ))}
          </div>
        </div>

        {/* Content area sesuai tab */}
        {activeTab === 'chapters' && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: chapters */}
            <div className="space-y-4 lg:col-span-2">
              {chapters.map((chapter, idx) => (
                <Collapsible key={chapter.id} open={!!open[chapter.id]} onOpenChange={(v) => setOpen((s) => ({ ...s, [chapter.id]: v }))} className="group">
                  <Card className="border-sidebar-border/70">
                    <CardHeader className="px-5 py-4">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-sidebar-border/60 bg-muted/40 text-[13px] font-bold">{idx + 1}</div>
                            <div>
                              <CardTitle className="text-[15px]">{chapter.title}</CardTitle>
                              <p className="text-xs text-muted-foreground">{chapter.description}</p>
                            </div>
                          </div>
                          <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2">
                      <CardContent className="pb-5">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <tbody className="divide-y divide-sidebar-border/60">
                              {chapter.exercises.map((ex, i) => (
                                <tr key={ex.title} className="hover:bg-muted/40">
                                  <td className="p-2 w-[140px] text-muted-foreground">Exercise {i + 1}</td>
                                  <td className="p-2">{ex.title}</td>
                                  <td className="p-2 text-right"><StatusBadge exercise={ex} /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>

            {/* Right: course progress & extras */}
            <div className="space-y-4">
              <Card className="border-sidebar-border/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Trophy className="size-4 text-yellow-400" />Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="relative h-2 w-full overflow-hidden rounded-md border border-sidebar-border/60 bg-muted">
                      <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" style={{ width: '30%' }} />
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0000_0_8px,#ffffff10_8px_16px)]" />
                    </div>
                    <p className="text-xs text-muted-foreground">30% complete • Chapter 1 of 12</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sidebar-border/70">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Cheat Sheets</li>
                    <li>• Community Q&A</li>
                    <li>• Tips & Tricks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="grid gap-6">
            <Card className="border-sidebar-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="size-4 text-yellow-400" />Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="relative h-2 w-full overflow-hidden rounded-md border border-sidebar-border/60 bg-muted">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" style={{ width: '30%' }} />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0000_0_8px,#ffffff10_8px_16px)]" />
                  </div>
                  <p className="text-xs text-muted-foreground">30% complete • Chapter 1 of 12</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid gap-6">
            <Card className="border-sidebar-border/70">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cheat Sheets</li>
                  <li>• Community Q&A</li>
                  <li>• Tips & Tricks</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}