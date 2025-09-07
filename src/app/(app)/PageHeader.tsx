'use client';

import AddHabitDialog from './today/AddHabitDialog';
import React from 'react';
import MobileNav from './MobileNav';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  showAddHabit?: boolean;
}

export function PageHeader({ title, children, showAddHabit = false }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <MobileNav />
        <h1 className="font-heading text-4xl font-extrabold tracking-tighter">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
        {showAddHabit && <AddHabitDialog />}
      </div>
    </header>
  );
}
