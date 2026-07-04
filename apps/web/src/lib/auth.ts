// Server-side auth helper using Supabase SSR
import { createServerSupabaseClient } from '@/lib/supabase-server'

export interface Session {
  user: {
    id: string
    email: string
    name?: string
    avatar?: string
    plan?: string
  }
}

export async function getServerSession(): Promise<Session | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) return null

    // Try to fetch additional user data from the users table
    const { data: userData } = await supabase
      .from('users')
      .select('name, avatar, plan')
      .eq('auth_id', user.id)
      .single()

    return {
      user: {
        id: user.id,
        email: user.email ?? '',
        name: userData?.name ?? user.user_metadata?.full_name ?? undefined,
        avatar: userData?.avatar ?? user.user_metadata?.avatar_url ?? undefined,
        plan: userData?.plan ?? 'FREE',
      },
    }
  } catch {
    return null
  }
}
