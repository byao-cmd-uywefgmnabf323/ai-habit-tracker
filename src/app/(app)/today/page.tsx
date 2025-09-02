import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import TodayClientPage from './TodayClientPage';
import { Habit } from '@/types/habit';

export default async function TodayPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: habits, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching habits:', error);
    // Optionally, render an error state
  }

  return <TodayClientPage user={user} habits={(habits as Habit[]) || []} />;
}

