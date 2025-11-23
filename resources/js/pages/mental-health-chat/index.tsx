import { Button } from '@/components/ui/button';
import DashboardTopNav from '@/components/dashboard-top-nav';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Bot, RefreshCw, Send, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
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

    const bgClass = 'min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Tambahkan pesan user ke chat
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Kirim ke backend
            const response = await axios.post('/api/mental-health-chat', {
                message: userMessage.content,
                history: messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            });

            // Tambahkan balasan AI
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content:
                    response?.data?.response ??
                    'Terima kasih sudah bercerita. Aku sedang berusaha memahami situasimu dan akan menanggapi dengan sebaik mungkin.',
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            // Tampilkan pesan error yang empatik
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(),
                content:
                    'Maaf, sepertinya ada kendala teknis. Mohon coba lagi sebentar lagi ya. Terima kasih sudah bersabar 💛',
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
            console.error('Error:', error);
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex h-[calc(100vh-16rem)] flex-col">
                {/* Header / Info */}
                <div
                    className="mb-4 rounded-2xl border-0 shadow-xl bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 p-6"
                    aria-label="Informasi layanan"
                >
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="mb-2 flex items-center gap-2 text-2xl font-black text-gray-900">
                            <Bot className="w-6 h-6" />
                            Ruang Konseling Kesehatan Mental
                        </h2>
                        <p className="text-sm text-gray-700 font-medium">Berbagi cerita dan perasaanmu dengan aman.</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Selamat datang di{' '}
                        <span className="font-medium">ruang aman</span> Anda.
                        Asisten kami siap mendengarkan cerita dan membantu Anda
                        memahami perasaan yang sedang muncul. Disini hanya ada aku, kamu, dan perasaan apapun yang boleh diungkapkan.
                    </p>

                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <p className="font-semibold">Catatan penting</p>
                        <p>
                            Asisten ini tidak menggantikan peran psikolog atau
                            psikiater. Jika Anda mengalami tekanan berat,
                            pikiran menyakiti diri, atau butuh bantuan segera,
                            harap hubungi tenaga profesional atau layanan
                            darurat terdekat.
                        </p>
                    </div>
                </div>

                {/* Chat container */}
                <div
                    className="mb-4 flex-1 overflow-y-auto rounded-2xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm p-4 shadow-sm"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                >
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex max-w-[80%] items-start gap-3 rounded-lg p-3',
                                    message.role === 'assistant'
                                        ? 'bg-muted/50'
                                        : 'ml-auto bg-primary/10',
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

                                <div className="flex-1">
                                    <div className="text-sm whitespace-pre-wrap">
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
                                <RefreshCw className="size-4 animate-spin" />
                                <span>
                                    Sedang menyiapkan tanggapan dengan penuh
                                    perhatian...
                                </span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input area */}
                <div className="relative">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tulis apa yang sedang Anda rasakan atau pikirkan..."
                        className="w-full resize-none rounded-2xl border-2 border-gray-100 bg-white/80 backdrop-blur-sm p-3 pr-12 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                        rows={2}
                        disabled={isLoading}
                        aria-label="Ketik perasaan atau pikiran Anda"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="absolute top-2 right-3 h-8 w-8 rounded-xl p-0 bg-purple-600 hover:bg-purple-700 text-white"
                        aria-label="Kirim pesan"
                    >
                        <Send className="size-4" />
                    </Button>
                </div>
            </div>
            </main>
        </div>
    );
}
