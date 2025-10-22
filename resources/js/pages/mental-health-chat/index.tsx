import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
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
    const name = auth?.user?.name ?? 'Pengguna';

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: `Halo ${name}, saya adalah asisten kesehatan mental AI yang siap membantu Anda. Bagaimana perasaan Anda hari ini? Anda dapat berbagi apa pun yang sedang Anda rasakan, dan saya akan berusaha memberikan dukungan terbaik.`,
            role: 'assistant',
            timestamp: new Date(),
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboard().url },
        { title: 'Mental Health Chat', href: '/mental-health-chat' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message to chat
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
            // Send request to backend API using axios
            const response = await axios.post('/api/mental-health-chat', {
                message: inputMessage,
                history: messages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            });

            // Add AI response to chat
            const aiMessage: Message = {
                id: Date.now().toString(),
                content: response.data.response,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            // Handle error with a friendly message
            const errorMessage: Message = {
                id: Date.now().toString(),
                content:
                    'Maaf, terjadi kesalahan dalam memproses pesan Anda. Silakan coba lagi nanti.',
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mental Health Chat" />

            <div className="flex h-[calc(100vh-12rem)] flex-col p-4">
                <div className="mb-4 rounded-xl border border-sidebar-border/70 bg-card p-4">
                    <h2 className="mb-2 text-lg font-semibold">
                        Asisten Kesehatan Mental
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Selamat datang di layanan konsultasi kesehatan mental.
                        Asisten AI kami dirancang untuk memberikan dukungan dan
                        saran yang empatik. Silakan berbagi apa yang Anda
                        rasakan, dan kami akan berusaha membantu.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                        <p className="font-semibold">Catatan penting:</p>
                        <p>
                            Layanan ini tidak menggantikan konsultasi dengan
                            profesional kesehatan mental. Untuk masalah serius,
                            silakan hubungi tenaga profesional.
                        </p>
                    </div>
                </div>

                {/* Chat container */}
                <div className="mb-4 flex-1 overflow-y-auto rounded-xl border border-sidebar-border/70 bg-card p-4">
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
                                <span>Asisten sedang mengetik...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input area */}
                <div className="flex gap-2">
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ketik pesan Anda di sini..."
                        className="flex-1 resize-none rounded-md border border-sidebar-border/70 bg-card p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={2}
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="self-end"
                    >
                        <Send className="mr-2 size-4" />
                        Kirim
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
