'use server';

import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export type Task = {
  id: string;
  user_id: string;
  title: string;
  date: string; // YYYY-MM-DD
  done: boolean;
  created_at: string;
};

export async function addTask(title: string, date: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return { error: 'You must be logged in.' };

  const { error } = await supabase.from('tasks').insert([{ title, date, user_id: user.id, done: false }]);
  if (error) return { error: error.message };

  revalidatePath('/tasks');
  return { success: true };
}

export async function toggleTask(id: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return { error: 'You must be logged in.' };

  const { data, error } = await supabase.from('tasks').select('done').eq('id', id).eq('user_id', user.id).single();
  if (error) return { error: error.message };

  const { error: updErr } = await supabase.from('tasks').update({ done: !data.done }).eq('id', id).eq('user_id', user.id);
  if (updErr) return { error: updErr.message };

  revalidatePath('/tasks');
  revalidatePath('/tasks/all');
  return { success: true };
}

export async function saveReflection(date: string, content: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return { error: 'You must be logged in.' };

  // Store reflection in ai_notes table keyed by title
  const title = `reflection-${date}`;

  // Try update existing
  const { data: existing } = await supabase
    .from('ai_notes')
    .select('id')
    .eq('user_id', user.id)
    .eq('title', title)
    .single();

  if (existing?.id) {
    const { error } = await supabase.from('ai_notes').update({ content }).eq('id', existing.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from('ai_notes').insert([{ user_id: user.id, title, content }]);
    if (error) return { error: error.message };
  }

  revalidatePath('/tasks');
  return { success: true };
}
