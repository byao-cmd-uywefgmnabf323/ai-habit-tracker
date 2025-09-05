import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import TodayClientPage from './TodayClientPage';
import { Habit } from '@/types/habit';

export default async function TodayPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const today = new Date().toISOString().split('T')[0];

  // Fetch habits with completion status for today
  const { data: habits, error } = await supabase
    .from('habits')
    .select(`
      *,
      habit_completions!left(
        id,
        completed_at
      )
    `)
    .eq('user_id', user!.id)
    .eq('habit_completions.completed_at', today)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching habits:', error);
  }

  // Transform the data to include completed_today flag
  const habitsWithCompletion = (habits || []).map(habit => ({
    ...habit,
    completed_today: habit.habit_completions && habit.habit_completions.length > 0
  }));

  return <TodayClientPage user={user} habits={habitsWithCompletion as Habit[]} />;
}

