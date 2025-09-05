'use client';

import { Habit } from '@/types/habit';
import HabitItem from '@/app/(app)/today/HabitItem';
import AddHabitDialog from '../today/AddHabitDialog';

interface HabitsClientPageProps {
  habits: Habit[];
}

export default function HabitsClientPage({ habits }: HabitsClientPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 tracking-tight">
          Your Habits
        </h1>
        <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Manage and track all your habits in one place. Build consistency, one day at a time.
        </p>
        <AddHabitDialog />
      </div>

      {/* Habits Section */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden p-12">
        {habits.length === 0 ? (
          <div className="text-center py-20 px-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200/30 dark:border-purple-700/30">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No habits created yet</h3>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Start building better habits today. Create your first habit and begin your journey to success.
            </p>
            <AddHabitDialog />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">All Your Habits</h2>
              <div className="text-lg text-slate-600 dark:text-slate-300">
                {habits.length} habit{habits.length !== 1 ? 's' : ''} created
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
    </div>
  );
}
