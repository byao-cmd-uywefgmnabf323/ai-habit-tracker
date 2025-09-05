'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { Check, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toggleHabitCompletion } from './actions';

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem({ habit }: HabitItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isCompleted = habit.completed_today || false;

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleHabitCompletion(habit.id);
    } catch (error) {
      console.error('Error toggling habit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li>
      <Card
        className={cn(
          'cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2',
          isCompleted
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 shadow-lg'
            : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl'
        )}
        onClick={handleToggle}
      >
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                isCompleted
                  ? 'bg-green-500 border-green-500'
                  : 'border-slate-300 dark:border-slate-600 hover:border-purple-400'
              )}
            >
              {isCompleted && <Check className="w-4 h-4 text-white" />}
            </div>
            <span
              className={cn(
                'text-xl font-semibold transition-all duration-300',
                isCompleted 
                  ? 'line-through text-green-700 dark:text-green-300' 
                  : 'text-slate-900 dark:text-white'
              )}
            >
              {habit.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {isCompleted && (
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Completed!
                </span>
              </div>
            )}
            {isLoading && (
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
