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
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Today</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <AddHabitDialog />
      </header>

      <div className="mt-8">
        {habits.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <h3 className="text-lg font-medium">No habits yet!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add a new habit to get started.
            </p>
            <div className="mt-4">
              <AddHabitDialog />
            </div>
          </div>
        ) : (
          <ul>
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}



