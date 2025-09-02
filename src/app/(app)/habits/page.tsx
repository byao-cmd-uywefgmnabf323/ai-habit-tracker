import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';
import HabitsClientPage from './HabitsClientPage';

export default async function HabitsPage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data: habits, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching habits:', error);
    // Handle error appropriately
  }

  return <HabitsClientPage habits={habits || []} />;
}
