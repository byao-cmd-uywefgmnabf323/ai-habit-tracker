'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, LayoutDashboard, ListTodo, BarChart3, Bot, Settings, Target } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/today', label: 'Today', icon: LayoutDashboard },
  { href: '/tasks', label: 'My Tasks', icon: ListTodo },
  { href: '/tasks/all', label: 'All Tasks', icon: ListTodo },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/coach', label: 'Coach', icon: Bot },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          // Override dialog positioning to behave like a left sheet
          '!left-0 !top-0 !translate-x-0 !translate-y-0 h-svh w-80 max-w-[85vw] rounded-none p-0 sm:hidden',
          'data-[state=open]:animate-in data-[state=closed]:animate-out'
        )}
      >
        <div className="flex h-full flex-col border-r bg-background">
          <div className="flex items-center gap-3 px-4 py-4 border-b">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div className="font-heading text-xl font-bold">Habit Tracker</div>
            <Button size="icon" variant="ghost" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t p-2">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted'
              )}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
