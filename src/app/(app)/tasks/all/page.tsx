import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import AllTasksClientPage from './tasksAllClientPage';

export default async function AllTasksPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  if (!user) return <AllTasksClientPage groups={{}} />;

  const { data } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .order('created_at', { ascending: true });

  const groups = Object.groupBy((data ?? []) as any[], (t) => t.date) as Record<string, any[]>;
  return <AllTasksClientPage groups={groups} />;
}
