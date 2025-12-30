"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, MessageSquare, Heart, Clock, Shield, Sparkles, ArrowRight, Check } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function FeaturesAiChat() {
    return (
        <section className="py-24 bg-pink-50/30 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 to-transparent -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Visual Card */}
                    <div className="relative">
                        <div className="relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
                            {/* "AI Powered" Badge absolute */}
                            <div className="absolute -top-6 -left-6 z-20">
                                <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-4 rounded-3xl rounded-br-none shadow-lg shadow-pink-200">
                                    <span className="block font-black text-sm">AI</span>
                                    <span className="block font-medium text-xs opacity-90">Powered</span>
                                </div>
                            </div>

                            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8">
                                    {/* Icon Header */}
                                    <div className="flex justify-center mb-6 relative">
                                        <div className="relative">
                                            <Bot className="w-20 h-20 text-gray-800" strokeWidth={1.5} />
                                            <div className="absolute -right-6 -top-2 bg-white rounded-full p-2 shadow-sm">
                                                <MessageSquare className="w-8 h-8 text-gray-800" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">AI Chatbot Assistant</h3>
                                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                                            Berbicara dengan AI yang memahami dan siap membantu kapan saja
                                        </p>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-purple-600 text-white rounded-2xl p-4 text-center shadow-lg shadow-purple-200">
                                            <div className="text-xl font-black">100K+</div>
                                            <div className="text-[10px] opacity-90 font-medium">Conversations</div>
                                        </div>
                                        <div className="bg-rose-500 text-white rounded-2xl p-4 text-center shadow-lg shadow-rose-200">
                                            <div className="text-xl font-black">&lt;1s</div>
                                            <div className="text-[10px] opacity-90 font-medium">Response Time</div>
                                        </div>
                                    </div>

                                    {/* Feature List */}
                                    <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100">
                                        <p className="text-xs font-bold text-gray-400 text-center mb-4 uppercase tracking-wider">Fitur Chatbot:</p>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Emotional Support", color: "bg-green-100 text-green-700" },
                                                { label: "Mental Health Tips", color: "bg-green-100 text-green-700" },
                                                { label: "24/7 Availability", color: "bg-green-100 text-green-700" }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span className="text-sm font-bold text-gray-700">{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Background Blob behind card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-100 rounded-full blur-3xl -z-10 opacity-60" />
                    </div>

                    {/* Right Column: Text Content */}
                    <div>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-0 mb-6 px-4 py-1.5 rounded-full font-bold">
                            <MessageSquare className="w-3.5 h-3.5 mr-2" />
                            Always Available
                        </Badge>

                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            <span className="text-green-500">chatbot ai</span> kami
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Berbicara dengan AI chatbot yang empatik dan memahami! Dapatkan dukungan instan, tips kesehatan mental, dan panduan personal 24/7. Selalu siap mendengarkan kapanpun kamu butuhkan. 🤖✨
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                "24/7 Instant Response",
                                "Empathetic AI Conversations",
                                "Personalized Mental Health Tips",
                                "Private & Confidential"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 group">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                                        <Check className="w-3.5 h-3.5 text-purple-600 group-hover:text-white transition-colors" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-700 font-bold group-hover:text-purple-700 transition-colors">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/mental-health-chat">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-2 border-cyan-400 text-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-500 font-black text-lg transition-all shadow-sm hover:shadow-cyan-100"
                            >
                                MULAI CHAT <ArrowRight className="ml-2 w-5 h-5" strokeWidth={2.5} />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
