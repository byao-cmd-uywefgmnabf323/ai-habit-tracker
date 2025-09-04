'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/today', label: 'Today' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/habits', label: 'Habits' },
  { href: '/coach', label: 'Coach' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-5xl items-center mx-auto">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/today" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Habit Tracker</span>
          </Link>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  isActive ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* User profile / logout button can go here */}
        </div>
      </div>
    </header>
  );
}
