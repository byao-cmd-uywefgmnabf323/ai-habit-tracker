'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, BarChart3, List, Bot, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/today', label: 'Today', icon: Calendar },
  { href: '/habits', label: 'Habits', icon: List },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/coach', label: 'Coach', icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/30 border-r border-purple-200/50 dark:border-purple-800/30">
      <div className="flex h-full flex-col px-6 py-8">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/today" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              HabitFlow
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-14 text-base font-semibold transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                      : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:text-purple-700 dark:hover:text-purple-300 hover:scale-[1.02] hover:shadow-md"
                  )}
                >
                  <Icon className={cn("w-5 h-5 mr-4", isActive ? "text-white" : "text-purple-500")} />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom decoration */}
        <div className="mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-700/30">
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Build better habits, one day at a time ✨
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
