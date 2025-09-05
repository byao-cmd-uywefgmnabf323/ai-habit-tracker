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
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-700/30 mb-8">
          <span className="text-purple-600 dark:text-purple-300 font-semibold text-lg">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h1 className="text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight">
          Today's Habits
        </h1>
        <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your life one habit at a time. Track your progress and build lasting routines.
        </p>
        <AddHabitDialog />
      </div>

      {/* Habits Section */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden">
        <CardContent className="p-12">
          <div className="space-y-8">
            {habits.length === 0 ? (
              <div className="text-center py-20 px-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/30 dark:border-purple-700/30">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to start your journey?</h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                  Create your first habit and begin building the life you want. Every expert was once a beginner.
                </p>
                <AddHabitDialog />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Habits</h2>
                  <div className="text-lg text-slate-600 dark:text-slate-300">
                    {habits.filter(h => h.completed_today).length} of {habits.length} completed
                  </div>
                </div>
                <ul className="space-y-6">
                  {habits.map((habit) => (
                    <HabitItem key={habit.id} habit={habit} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
