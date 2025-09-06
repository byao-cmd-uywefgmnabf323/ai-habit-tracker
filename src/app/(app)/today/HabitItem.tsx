'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { Check, Zap } from 'lucide-react';
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
    <li 
      className={cn(
        'p-6 rounded-4xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between',
        isCompleted
          ? 'bg-primary/10 border-primary/20'
          : 'bg-card hover:border-primary/50'
      )}
      onClick={handleToggle}
    >
      <div className="flex items-center gap-6">
        <div
          className={cn(
            'w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 flex-shrink-0',
            isCompleted
              ? 'bg-primary border-primary'
              : 'border-muted-foreground/20'
          )}
        >
          {isCompleted && <Check className="w-6 h-6 text-primary-foreground" />}
        </div>
        <div>
          <p
            className={cn(
              'text-xl font-bold transition-all duration-300',
              isCompleted 
                ? 'line-through text-muted-foreground' 
                : 'text-foreground'
            )}
          >
            {habit.name}
          </p>
          {habit.description && (
            <p className={cn(
              'text-muted-foreground transition-all duration-300',
              isCompleted && 'line-through'
            )}>
              {habit.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {isCompleted && !isLoading && (
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-primary">
              Done!
            </span>
          </div>
        )}
        {isLoading && (
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    </li>
  );
}
