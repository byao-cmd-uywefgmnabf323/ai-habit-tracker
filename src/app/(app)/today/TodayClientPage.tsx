'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Habit } from '@/types/habit';
import HabitItem from './HabitItem';
import AddHabitDialog from './AddHabitDialog';
import { Card, CardContent } from '@/components/ui/card';

interface TodayClientPageProps {
  user: User | null;
  habits: Habit[];
}

export default function TodayClientPage({ user, habits }: TodayClientPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-0 bg-white dark:bg-slate-800">
        <CardContent className="p-8 lg:p-12">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Today</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <AddHabitDialog />
          </header>

          <div className="space-y-8">
            {habits.length === 0 ? (
              <div className="text-center py-24 px-8 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">No habits for today.</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                  Ready to build a new routine? Add your first habit to get started.
                </p>
                <AddHabitDialog />
              </div>
            ) : (
              <ul className="space-y-6">
                {habits.map((habit) => (
                  <HabitItem key={habit.id} habit={habit} />
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
