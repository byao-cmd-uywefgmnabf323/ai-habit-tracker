'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { Check, Square } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem({ habit }: HabitItemProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  // In a real app, you'd fetch and update completion status from the database.

  return (
    <li>
      <Card
        className={cn(
          'cursor-pointer transition-all',
          isCompleted
            ? 'bg-muted/50 border-transparent shadow-none'
            : 'hover:bg-muted/50'
        )}
        onClick={() => setIsCompleted(!isCompleted)}
      >
        <CardContent className="flex items-center justify-between p-4">
          <span
            className={cn(
              'font-medium',
              isCompleted && 'line-through text-muted-foreground'
            )}
          >
            {habit.name}
          </span>
          {isCompleted ? (
            <Check className="w-5 h-5 text-primary" />
          ) : (
            <Square className="w-5 h-5 text-muted-foreground/50" />
          )}
        </CardContent>
      </Card>
    </li>
  );
}
