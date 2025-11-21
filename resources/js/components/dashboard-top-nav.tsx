"use client";
import { Link, usePage } from "@inertiajs/react";
import { Menu, Sparkles, Brain, Trophy, Target, ShoppingCart, Award } from "lucide-react";
import { mentoring, leaderboard, missions, shop, profile } from "@/routes";

type Item = { href: string; label: string; icon: any };

export default function DashboardTopNav({ items }: { items?: Item[] }) {
  const page = usePage<any>();
  const name: string = page?.props?.auth?.user?.name ?? "Player";
  const quickActions: Item[] =
    items ?? [
      { icon: Brain, label: "Belajar", href: mentoring().url },
      { icon: Trophy, label: "Skor", href: leaderboard().url },
      { icon: Target, label: "Misi", href: missions().url },
      { icon: ShoppingCart, label: "Toko", href: shop().url },
      { icon: Award, label: "Lainnya", href: "/" },
    ];

  const currentUrl = page?.url ?? "";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">MindPath</h1>
              <p className="text-xs text-gray-500">Perjalanan Mental Sehat</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {quickActions.map((action, idx) => {
              const isActive = currentUrl === action.href;
              const Icon = action.icon;
              const activeGradient = "bg-gradient-to-r from-purple-500 to-pink-600";
              return (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive ? `${activeGradient} text-white shadow-lg scale-105` : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{action.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={profile().url}
              prefetch
              className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {name.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-purple-900">Profil</span>
            </Link>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}