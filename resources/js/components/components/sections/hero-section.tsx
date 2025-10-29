import React from 'react';
import Image from 'next/image';
import { ParallaxLayer } from '@/components/ui/parallax';
import { Sparkles, Star, Zap, Heart, Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-cyan-50">
      {/* Floating decorative elements - Codedex inspired */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-8 h-8 bg-yellow-400 rounded-lg rotate-12 opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Star className="w-10 h-10 text-purple-400 opacity-50" fill="currentColor" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-12 h-12 text-cyan-400 opacity-40" />
      </div>
      <div className="absolute top-60 right-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-6 h-6 bg-pink-400 rounded-full opacity-50"></div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-8 px-5 py-12 md:py-16 lg:grid-cols-2 lg:gap-x-16 lg:py-20 relative z-10">
        {/* Left Column: Image with adventure badges */}
        <div className="flex justify-center lg:justify-start relative">
          <div className="relative">
            <ParallaxLayer speed={0.18}>
              <Image
              src="https://d35aaqx5ub95lt.cloudfront.net/images/splash-2023/8b3a971da40656dec61715018698f16c.svg"
              alt="Ilustrasi karakter kartun yang menggambarkan kesehatan mental dan kesejahteraan"
              width={488}
              height={450}
              priority
              className="relative z-10"
              />
            </ParallaxLayer>
            
            {/* Wellness Badge - Codedex style */}
            <ParallaxLayer speed={0.28}>
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg transform rotate-12 animate-float z-20">
              <div className="flex items-center gap-1.5">
                <Heart className="w-5 h-5" fill="currentColor" />
                <span className="font-bold text-lg">+100 Poin</span>
              </div>
            </div>
            </ParallaxLayer>

            {/* Achievement Badge */}
            <ParallaxLayer speed={0.32}>
            <div className="absolute -bottom-2 -left-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-3 py-2 rounded-xl shadow-lg transform -rotate-6 animate-float z-20" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <span className="font-bold text-sm">Mental Warrior</span>
              </div>
            </div>
            </ParallaxLayer>
          </div>
        </div>

        {/* Right Column: Text & Buttons with adventure theme */}
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          {/* Adventure subtitle with stars */}
          <div className="flex items-center gap-2 text-purple-600 font-bold text-sm uppercase tracking-wider">
            <Star className="w-4 h-4" fill="currentColor" />
            <span>Mulai Perjalanan Mentalmu</span>
            <Star className="w-4 h-4" fill="currentColor" />
          </div>

          <h1 className="text-3xl font-bold leading-[1.1] text-[#131f40] md:text-[38px] lg:text-[44px]">
            Cara <span className="text-gradient-adventure">Seru & Gratis</span> untuk Merawat Kesehatan Mentalmu!
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-xl">
            Bergabunglah dalam petualangan epik kesehatan mental! Kumpulkan poin wellness, raih achievement badges, dan unlock level ketenangan baru setiap hari. 🧠✨
          </p>

          {/* Stats bar - Codedex inspired */}
          <div className="flex gap-4 text-sm">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-purple-200 shadow-sm">
              <div className="font-bold text-purple-600">5M+</div>
              <div className="text-gray-600 text-xs">Pengguna</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-cyan-200 shadow-sm">
              <div className="font-bold text-cyan-600">20+</div>
              <div className="text-gray-600 text-xs">Program</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-emerald-200 shadow-sm">
              <div className="font-bold text-emerald-600">100%</div>
              <div className="text-gray-600 text-xs">Gratis</div>
            </div>
          </div>

          <div className="mt-2 flex w-full max-w-md flex-col items-stretch gap-3">
            <a
              href="#"
              className="group relative block rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-8 py-4 text-center font-bold uppercase text-white transition hover:brightness-105 hover:scale-[1.02] active:translate-y-0.5 active:border-b-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Brain className="w-5 h-5" />
                Mulai Perjalanan
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </a>
            <a
              href="#"
              className="block rounded-2xl border-2 border-solid border-purple-300 bg-white px-8 py-4 text-center font-bold uppercase text-purple-600 shadow-sm transition hover:bg-purple-50 hover:border-purple-400 active:translate-y-px"
            >
              Saya Sudah Punya Akun
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;