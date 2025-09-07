import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import AllTasksClientPage from './tasksAllClientPage';
import type { Task } from '../actions';

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

  const list = (data ?? []) as Task[];
  const groups = list.reduce((acc: Record<string, Task[]>, t) => {
    (acc[t.date] ||= []).push(t);
    return acc;
  }, {} as Record<string, Task[]>);

  return <AllTasksClientPage groups={groups} />;
}
