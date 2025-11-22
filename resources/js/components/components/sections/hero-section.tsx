import { ParallaxLayer } from '@/components/ui/parallax';
import { Brain, Heart, Sparkles, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

const HeroSection = () => {
    return (
        <main className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-cyan-50">
            {/* Floating decorative elements - Codedex inspired */}
            <div className="animate-float absolute top-20 left-10">
                <div className="h-8 w-8 rotate-12 rounded-lg bg-yellow-400 opacity-60"></div>
            </div>
            <div
                className="animate-float absolute top-40 right-20"
                style={{ animationDelay: '1s' }}
            >
                <Star
                    className="h-10 w-10 text-purple-400 opacity-50"
                    fill="currentColor"
                />
            </div>
            <div
                className="animate-float absolute bottom-32 left-20"
                style={{ animationDelay: '2s' }}
            >
                <Sparkles className="h-12 w-12 text-cyan-400 opacity-40" />
            </div>
            <div
                className="animate-float absolute top-60 right-10"
                style={{ animationDelay: '0.5s' }}
            >
                <div className="h-6 w-6 rounded-full bg-pink-400 opacity-50"></div>
            </div>

            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-8 px-5 py-12 md:py-16 lg:grid-cols-2 lg:gap-x-16 lg:py-20">
                {/* Left Column: Image with adventure badges */}
                <div className="relative flex justify-center lg:justify-start">
                    <div className="relative">
                        <ParallaxLayer speed={0.18}>
                            <script
                                type="module"
                                src="https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js"
                            ></script>
                            {/* @ts-expect-error spline-viewer is a custom element */}
                            <spline-viewer url="https://prod.spline.design/2pXoBvPOhLXPorS1/scene.splinecode"></spline-viewer>
                        </ParallaxLayer>

                        {/* Wellness Badge - Codedex style */}
                        <ParallaxLayer speed={0.28}>
                            <div className="animate-float absolute -top-4 -right-4 z-20 rotate-12 transform rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 px-4 py-2 text-white shadow-lg">
                                <div className="flex items-center gap-1.5">
                                    <Heart
                                        className="h-5 w-5"
                                        fill="currentColor"
                                    />
                                    <span className="text-lg font-bold">
                                        +100 Poin
                                    </span>
                                </div>
                            </div>
                        </ParallaxLayer>

                        {/* Achievement Badge */}
                        <ParallaxLayer speed={0.32}>
                            <div
                                className="animate-float absolute -bottom-2 -left-4 z-20 -rotate-6 transform rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 px-3 py-2 text-white shadow-lg"
                                style={{ animationDelay: '1.5s' }}
                            >
                                <div className="flex items-center gap-1">
                                    <Brain className="h-4 w-4" />
                                    <span className="text-sm font-bold">
                                        Mental Warrior
                                    </span>
                                </div>
                            </div>
                        </ParallaxLayer>
                    </div>
                </div>

                {/* Right Column: Text & Buttons with adventure theme */}
                <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
                    {/* Adventure subtitle with stars */}
                    <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-purple-600 uppercase">
                        <Star className="h-4 w-4" fill="currentColor" />
                        <span>Mulai Perjalanan Mentalmu</span>
                        <Star className="h-4 w-4" fill="currentColor" />
                    </div>

                    <h1 className="text-3xl leading-[1.1] font-bold text-[#131f40] md:text-[38px] lg:text-[44px]">
                        Cara{' '}
                        <span className="text-gradient-adventure">
                            Seru & Gratis
                        </span>{' '}
                        untuk Merawat Kesehatan Mentalmu!
                    </h1>

                    <p className="max-w-xl text-base text-gray-600 md:text-lg">
                        Bergabunglah dalam petualangan epik kesehatan mental!
                        Kumpulkan poin wellness, raih achievement badges, dan
                        unlock level ketenangan baru setiap hari. 🧠✨
                    </p>

                    {/* Stats bar - Codedex inspired */}
                    <div className="flex gap-4 text-sm">
                        <div className="rounded-xl border-2 border-purple-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-purple-600">5M+</div>
                            <div className="text-xs text-gray-600">
                                Pengguna
                            </div>
                        </div>
                        <div className="rounded-xl border-2 border-cyan-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-cyan-600">20+</div>
                            <div className="text-xs text-gray-600">Program</div>
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                            <div className="font-bold text-emerald-600">
                                100%
                            </div>
                            <div className="text-xs text-gray-600">Gratis</div>
                        </div>
                    </div>

                    <div className="mt-2 flex w-full max-w-md flex-col items-stretch gap-3">
                        <Link
                            href={dashboard()}
                            className="group hover-bob relative block overflow-hidden rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-8 py-4 text-center font-bold text-white uppercase transition-all duration-200 ease-out hover:scale-[1.02] hover:brightness-105 hover:-translate-y-1 active:translate-y-0.5 active:border-b-2"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Brain className="h-5 w-5" />
                                Mulai Perjalanan
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                        </Link>
                        <Link
                            href={dashboard()}
                            className="hover-bob block rounded-2xl border-2 border-solid border-purple-300 bg-white px-8 py-4 text-center font-bold text-purple-600 uppercase shadow-sm transition-all duration-200 ease-out hover:border-purple-400 hover:bg-purple-50 hover:-translate-y-1 active:translate-y-px"
                        >
                            Saya Sudah Punya Akun
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HeroSection;
