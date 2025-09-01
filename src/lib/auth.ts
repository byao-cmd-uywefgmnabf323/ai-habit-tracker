import { createClient } from '@/lib/supabase/server'

export async function getUserSession() {
  const supabase = createClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error getting user session:', error)
    return null
  }
}

export async function getCurrentUser() {
  const session = await getUserSession()
  return session?.user ?? null
}

