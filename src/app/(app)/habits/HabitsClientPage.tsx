'use client';

import { Habit } from '@/types/habit';
import HabitItem from '@/app/(app)/today/HabitItem';

interface HabitsClientPageProps {
  habits: Habit[];
}

export default function HabitsClientPage({ habits }: HabitsClientPageProps) {
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">All Habits</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all your habits in one place.
          </p>
        </div>
        {/* We can add a filter or sort button here later */}
      </header>

      <div className="mt-8">
        {habits.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <h3 className="text-lg font-medium">No habits yet!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add a new habit from the Today screen to get started.
            </p>
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
