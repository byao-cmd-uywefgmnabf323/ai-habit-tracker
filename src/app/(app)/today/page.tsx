import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import TodayClientPage from './TodayClientPage';
import { Habit } from '@/types/habit';

export default async function TodayPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const today = new Date().toISOString().split('T')[0];

  // Fetch all habits for the user
  const { data: habits, error: habitsError } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: true });

  if (habitsError) {
    console.error('Error fetching habits:', habitsError);
  }

  // Fetch today's done entries
  const { data: entries, error: entriesError } = await supabase
    .from('habit_entries')
    .select('habit_id')
    .eq('user_id', user!.id)
    .eq('date', today)
    .eq('status', 'done');

  if (entriesError) {
    console.error('Error fetching habit entries:', entriesError);
  }

  const doneSet = new Set((entries ?? []).map((e: { habit_id: string }) => e.habit_id));

  // Transform the data to include completed_today flag and normalize name
  type HabitRow = Habit & { title?: string; name?: string };
  const habitsWithCompletion: Habit[] = ((habits ?? []) as HabitRow[]).map((habit) => ({
    ...habit,
    name: habit.name ?? habit.title ?? 'Untitled',
    completed_today: doneSet.has(habit.id),
  }));

  return <TodayClientPage user={user} habits={habitsWithCompletion as Habit[]} />;
}

