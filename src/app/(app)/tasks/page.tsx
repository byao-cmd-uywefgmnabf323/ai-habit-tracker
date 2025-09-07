import { getCurrentUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import TasksClientPage from './tasksClientPage';

export default async function TasksPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  if (!user) return <TasksClientPage date={today} tasks={[]} reflection="" />;

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', today)
    .order('created_at', { ascending: true });

  // Load reflection from ai_notes titled reflection-YYYY-MM-DD
  const { data: note } = await supabase
    .from('ai_notes')
    .select('content')
    .eq('user_id', user.id)
    .eq('title', `reflection-${today}`)
    .single();

  return (
    <TasksClientPage date={today} tasks={(tasks ?? []) as any} reflection={note?.content ?? ''} />
  );
}
