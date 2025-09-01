'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import { CheckSquare, Square } from 'lucide-react';

interface HabitItemProps {
  habit: Habit;
}

export default function HabitItem({ habit }: HabitItemProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <li
      className="flex items-center justify-between p-4 mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={() => setIsCompleted(!isCompleted)}
    >
      <div className="flex items-center">
        {isCompleted ? (
          <CheckSquare className="w-6 h-6 text-green-500 mr-4" />
        ) : (
          <Square className="w-6 h-6 text-gray-400 dark:text-gray-500 mr-4" />
        )}
        <span className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}>
          {habit.name}
        </span>
      </div>
      {/* Maybe add streak info or other details here */}
    </li>
  );
}
