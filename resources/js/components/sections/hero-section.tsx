import { Brain, Heart, Sparkles, Star } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

const HeroSection = () => {
    const { auth } = usePage<unknown>().props;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-cyan-50 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
            {/* Background Decorations (Absolute but unobtrusive) */}
            <div className="absolute top-20 left-10 animate-float opacity-60">
                <div className="h-8 w-8 rotate-12 rounded-lg bg-yellow-400"></div>
            </div>
            <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
                <Star className="h-10 w-10 text-purple-400 opacity-50" fill="currentColor" />
            </div>
            <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="h-12 w-12 text-cyan-400 opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide mb-6">
                            <Star className="h-4 w-4" fill="currentColor" />
                            <span>Mulai Perjalanan Kesehatan Mental Bersama Moodly</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                            Jaga Kesehatan <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                Mentalmu
                            </span> <br className="hidden lg:block" />
                            dengan Moodly
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Bergabunglah dalam petualangan epik kesehatan mental!
                            Kumpulkan poin wellness, raih achievement badges, dan
                            unlock level ketenangan baru setiap hari. 🧠✨
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-[#58cc02] border-b-4 border-[#46a302] rounded-2xl hover:bg-[#61e002] hover:-translate-y-1 active:border-b-0 active:translate-y-1"
                            >
                                <Brain className="w-5 h-5 mr-2" />
                                Mulai Sekarang
                            </Link>
                            {!auth?.user && (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-purple-600 transition-all bg-white border-2 border-purple-200 rounded-2xl hover:bg-purple-50 hover:border-purple-300 hover:-translate-y-1"
                                >
                                    Saya Sudah Punya Akun
                                </Link>
                            )}
                        </div>

                        {/* Stats / Social Proof */}
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-semibold text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Brain size={18} /></div>
                                <span>5M+ Pengguna</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600"><Star size={18} /></div>
                                <span>Gratis Selamanya</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual / 3D Element */}
                    <div className="relative order-1 lg:order-2 flex justify-center">
                        <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                            {/* Decorative Blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

                            {/* 3D Spline Viewer Container - z-10 (Behind Badges) */}
                            <div className="relative z-10 w-full h-full rounded-[2rem] border-4 border-white/40 shadow-2xl bg-white/20 backdrop-blur-md overflow-hidden transform hover:rotate-1 transition-transform duration-500 flex items-center justify-center">
                                <img
                                    src="/images/moodly-mascot-v3.jpg"
                                    alt="Moodly Mascot"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute -top-6 -right-6 z-20 animate-float bg-white p-4 rounded-2xl shadow-xl border border-purple-100 hidden md:block" style={{ animationDelay: '1s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <Heart size={20} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Mood</p>
                                        <p className="font-bold text-gray-800">Happy</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-8 -left-4 z-20 animate-float bg-white p-4 rounded-2xl shadow-xl border border-cyan-100 hidden md:block" style={{ animationDelay: '2.5s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <Brain size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Streak</p>
                                        <p className="font-bold text-gray-800">5 Hari</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

