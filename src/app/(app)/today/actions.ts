'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

export async function addHabit(name: string, description?: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: 'You must be logged in to add a habit.',
    };
  }

  // Attempt 1: insert using `name`
  const attempt1 = await supabase
    .from('habits')
    .insert([{ name, description, user_id: user.id }])
    .select();

  let data = attempt1.data;
  let error = attempt1.error;

  // Attempt 2: if the first failed (e.g., column mismatch), insert using `title`
  if (error) {
    const attempt2 = await supabase
      .from('habits')
      .insert([{ title: name, description, user_id: user.id }])
      .select();
    data = attempt2.data;
    error = attempt2.error;
  }

  if (error) {
    console.error('Error adding habit:', error);
    return { error: error.message || 'Could not add habit. Please try again.' };
  }

  revalidatePath('/today');
  revalidatePath('/habits');

  return {
    data,
  };
}

export async function toggleHabitCompletion(habitId: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: 'You must be logged in to complete a habit.',
    };
  }

  const today = new Date().toISOString().split('T')[0];

  // Check if habit is already marked done today via habit_entries
  const { data: existingEntry } = await supabase
    .from('habit_entries')
    .select('id')
    .eq('habit_id', habitId)
    .eq('user_id', user.id)
    .eq('date', today)
    .eq('status', 'done')
    .single();

  if (existingEntry) {
    // Remove the "done" entry to un-complete
    const { error } = await supabase
      .from('habit_entries')
      .delete()
      .eq('id', existingEntry.id);

    if (error) {
      console.error('Error removing habit entry:', error);
      return {
        error: 'Could not update habit. Please try again.',
      };
    }
  } else {
    // Add a "done" entry for today
    const { error } = await supabase
      .from('habit_entries')
      .insert([
        {
          habit_id: habitId,
          user_id: user.id,
          date: today,
          status: 'done',
        },
      ]);

    if (error) {
      console.error('Error adding habit entry:', error);
      return {
        error: 'Could not complete habit. Please try again.',
      };
    }
  }

  revalidatePath('/today');
  revalidatePath('/tasks');
  revalidatePath('/analytics');

  return {
    success: true,
  };
}
