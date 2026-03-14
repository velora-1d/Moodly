import { Button } from '@/components/ui/button';
import DashboardTopNav from '@/components/dashboard-top-nav';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Bot, RefreshCw, Send, User, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';


type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
};

type ChatSession = {
    id: string;
    title: string;
    updated_at: string;
};

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string } | null;
    };
};

export default function MentalHealthChatPage() {
    const { auth } = usePage<SharedProps>().props;
    const name = auth?.user?.name ?? 'Teman';

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: `Halo ${name} 🌿, senang bisa berbicara denganmu. Aku di sini untuk mendengarkan dan menemanimu. Bagaimana kabar hatimu hari ini?`,
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [sessionCache, setSessionCache] = useState<Record<string, Message[]>>({});
    const SESSIONS_KEY = 'mh_sessions';
    const CACHE_KEY = 'mh_session_cache';

    const bgClass = 'min-h-screen relative bg-gradient-to-br from-purple-50 via-violet-50 to-white';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${Math.min(160, inputRef.current.scrollHeight)}px`;
    }, [inputMessage]);

    useEffect(() => {
        const loadSessions = async () => {
            const userId = auth?.user?.id;
            if (!userId) return;
            try {
                const res = await fetch(route('api.chat.sessions'));
                if (res.ok) {
                    const data = await res.json();
                    setSessions(data);
                    if (data.length > 0 && !activeSessionId) {
                        // Restore last session if not set, or just first one
                        setActiveSessionId(String(data[0].id));
                    }
                }
            } catch (e) {
                console.error("Failed to load sessions");
            }
        };
        loadSessions();
    }, [auth?.user?.id]);

    useEffect(() => {
        const loadMessagesForSession = async () => {
            if (!activeSessionId) return;

            // Check cache first (optional, but let's trust fresh data for now or simple cache)
            // For now, fetch fresh to ensure sync
            setIsLoading(true);
            try {
                const res = await fetch(route('api.chat.sessions.show', { id: activeSessionId }));
                if (res.ok) {
                    const data = await res.json();
                    // Map DB messages to UI
                    const mapped: Message[] = data.map((m: any) => ({
                        id: String(m.id),
                        content: m.content,
                        role: m.role,
                        timestamp: new Date(m.created_at)
                    }));
                    setMessages(mapped);
                }
            } catch (e) {
                console.error("Failed to load messages");
            }
            setIsLoading(false);
        };
        loadMessagesForSession();
    }, [activeSessionId]);

    const createNewChat = async () => {
        try {
            const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
            const res = await fetch(route('api.chat.sessions.store'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token }
            });
            if (res.ok) {
                const session = await res.json();
                setSessions((prev) => [session, ...prev]);
                setActiveSessionId(String(session.id));
                setMessages([]);
            }
        } catch (e) {
            console.error("Failed to create chat");
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Optimistic UI update
        const tempId = Date.now().toString();
        const userMessage: Message = {
            id: tempId,
            content: inputMessage,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            let currentSessionId = activeSessionId;
            if (!currentSessionId) {
                // Should have been created by createNewChat or initial load, but handling edge case
                const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
                const res = await fetch(route('api.chat.sessions.store'), { method: 'POST', headers: { 'X-CSRF-Token': token } });
                const session = await res.json();
                setSessions(prev => [session, ...prev]);
                setActiveSessionId(String(session.id));
                currentSessionId = String(session.id);
            }

            // Kirim ke backend
            const response = await axios.post(route('api.chat.messages.store', { id: currentSessionId }), {
                content: userMessage.content,
            });

            // Backend returns [UserMsg, BotMsg]
            const [savedUserMsg, botMsg] = response.data;

            // Replace temp user msg with real one if needed, and add bot msg
            setMessages((prev) => {
                const filtered = prev.filter(m => m.id !== tempId);
                return [
                    ...filtered,
                    { ...savedUserMsg, id: String(savedUserMsg.id), timestamp: new Date(savedUserMsg.created_at) }, // Parse dates
                    { ...botMsg, id: String(botMsg.id), timestamp: new Date(botMsg.created_at) }
                ];
            });

        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                content: 'Sedang ada gangguan koneksi. Coba lagi ya.',
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };



    return (
        <div className={bgClass}>
            <Head title="Ruang Konseling — Asisten Kesehatan Mental" />
            <DashboardTopNav />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl" />
                <div className="absolute bottom-16 right-24 w-56 h-56 bg-violet-300 rounded-full opacity-20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl" />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 min-h-[calc(100vh-14rem)]">
                    <div aria-label="Informasi layanan" className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-200 text-purple-600">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight">Chatbot AI</h2>
                                <p className="text-sm text-muted-foreground">Berbicara dengan AI yang memahami dan siap membantu kapan saja</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <Button onClick={createNewChat} className="w-full bg-purple-600 hover:bg-purple-700 text-white">New Chat</Button>
                            <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur p-2">
                                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Your Chats</div>
                                <div className="space-y-1">
                                    {sessions.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => { setActiveSessionId(s.id); const cached = sessionCache[s.id]; setMessages(cached ?? []); localStorage.setItem('mh_active_session_id', s.id); }}
                                            className={cn(
                                                'w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted/60',
                                                activeSessionId === s.id && 'bg-muted/60'
                                            )}
                                        >
                                            <div className="truncate">{s.title}</div>
                                            <div className="text-[11px] text-muted-foreground">{new Date(s.updated_at).toLocaleString()}</div>
                                        </button>
                                    ))}
                                    {sessions.length === 0 && (
                                        <div className="px-3 py-2 text-xs text-muted-foreground">Belum ada chat</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat container */}
                    <div
                        className="flex-1 overflow-y-auto rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-4 sm:p-6 shadow-xl"
                        role="log"
                        aria-live="polite"
                        aria-relevant="additions"
                    >
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        'flex items-start gap-3 rounded-lg p-3',
                                        message.role === 'assistant'
                                            ? 'bg-muted/50 max-w-md'
                                            : 'ml-auto bg-muted/50 max-w-md flex-row-reverse',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex h-8 w-8 items-center justify-center rounded-md',
                                            message.role === 'assistant'
                                                ? 'border border-blue-400/40 bg-blue-400/10'
                                                : 'border border-green-400/40 bg-green-400/10',
                                        )}
                                        aria-hidden="true"
                                    >
                                        {message.role === 'assistant' ? (
                                            <Bot className="size-4 text-blue-300" />
                                        ) : (
                                            <User className="size-4 text-green-300" />
                                        )}
                                    </div>

                                    <div className={cn(
                                        'flex-1',
                                        message.role === 'user' && 'text-right'
                                    )}>
                                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                            {message.content}
                                        </div>

                                        {/* Tampilkan waktu kecil; bisa di-hide jika mau */}
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {new Date(
                                                message.timestamp,
                                            ).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        <span className="size-2 rounded-full bg-gray-400 animate-bounce" />
                                        <span className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:120ms]" />
                                        <span className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:240ms]" />
                                    </span>
                                    <span>Menyiapkan tanggapan dengan penuh perhatian...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                        Moodly AI is an assistive tool and not a substitute for professional mental health care.
                    </div>

                    <div className="space-y-2">
                        <div className="relative flex items-center rounded-full border border-white/60 bg-white/80 shadow-xl backdrop-blur">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Share your thoughts..."
                                className="w-full resize-none rounded-full bg-transparent px-4 py-3 pr-14 text-sm focus:outline-none"
                                rows={2}
                                disabled={isLoading}
                                aria-label="Ketik perasaan atau pikiran Anda"
                                ref={inputRef}
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="absolute right-2 h-9 w-9 rounded-full p-0 bg-purple-600 hover:bg-purple-700 text-white"
                                aria-label="Kirim pesan"
                            >
                                <Send className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
