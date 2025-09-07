'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LayoutDashboard, ListTodo, BarChart3, Bot, Settings, Target } from 'lucide-react';

const navItems = [
  { href: '/today', label: 'Today', icon: LayoutDashboard },
  { href: '/tasks', label: 'My Tasks', icon: ListTodo },
  { href: '/tasks/all', label: 'All Tasks', icon: ListTodo },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/coach', label: 'Coach', icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Target className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Habit Tracker</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: pathname === item.href ? 'default' : 'ghost', size: 'icon' }),
                    'h-9 w-9',
                    pathname === item.href && 'bg-primary/70 text-primary-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={cn(
                  buttonVariants({ variant: pathname === '/settings' ? 'default' : 'ghost', size: 'icon' }),
                  'mt-auto h-9 w-9',
                  pathname === '/settings' && 'bg-primary/70 text-primary-foreground'
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
