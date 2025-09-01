'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, List, Bot, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/today', label: 'Today', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/habits', label: 'Habits', icon: List },
  { href: '/coach', label: 'Coach', icon: Bot },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center p-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
