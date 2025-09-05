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

  // Check if habit is already completed today
  const { data: existingCompletion } = await supabase
    .from('habit_completions')
    .select('id')
    .eq('habit_id', habitId)
    .eq('user_id', user.id)
    .eq('completed_at', today)
    .single();

  if (existingCompletion) {
    // Remove completion
    const { error } = await supabase
      .from('habit_completions')
      .delete()
      .eq('id', existingCompletion.id);

    if (error) {
      console.error('Error removing habit completion:', error);
      return {
        error: 'Could not update habit. Please try again.',
      };
    }
  } else {
    // Add completion
    const { error } = await supabase
      .from('habit_completions')
      .insert([
        {
          habit_id: habitId,
          user_id: user.id,
          completed_at: today,
        },
      ]);

    if (error) {
      console.error('Error adding habit completion:', error);
      return {
        error: 'Could not complete habit. Please try again.',
      };
    }
  }

  revalidatePath('/today');
  revalidatePath('/habits');
  revalidatePath('/analytics');

  return {
    success: true,
  };
}
