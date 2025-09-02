'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

export async function addHabit(habitName: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: 'You must be logged in to add a habit.',
    };
  }

  const { data, error } = await supabase
    .from('habits')
    .insert([
      {
        name: habitName,
        user_id: user.id,
        frequency_type: 'daily',
        target: 1,
      },
    ])
    .select();

  if (error) {
    console.error('Error adding habit:', error);
    return {
      error: 'Could not add habit. Please try again.',
    };
  }

  revalidatePath('/today');

  return {
    data,
  };
}
