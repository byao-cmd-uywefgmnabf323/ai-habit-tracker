'use client';

'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Habit } from '@/types/habit';
import HabitItem from './HabitItem';
import AddHabitDialog from './AddHabitDialog';

interface TodayClientPageProps {
  user: User | null;
  habits: Habit[];
}

export default function TodayClientPage({ user, habits }: TodayClientPageProps) {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Today</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <AddHabitDialog />
      </header>

      <div className="mt-8">
        {habits.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-lg bg-muted/20">
            <h3 className="text-xl font-medium">No habits for today.</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Ready to build a new routine? Add your first habit to get started.
            </p>
            <AddHabitDialog />
          </div>
        ) : (
          <ul className="space-y-4">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
