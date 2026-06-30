import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Client-side Supabase client
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
)

// Server-side Supabase client (for Server Components)
export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting error
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal error
          }
        },
      },
    }
  )
}

// Middleware for route protection
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users from auth pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Admin route protection
export async function requireAdmin(request: NextRequest) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check if user is admin
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('auth_id', user.id)
    .single()

  if (!userData || userData.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Type-safe database helper
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          name: string | null
          avatar: string | null
          role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'BUSINESS' | 'ENTERPRISE'
          created_at: string
          updated_at: string
        }
        Insert: {
          auth_id: string
          email: string
          name?: string
          avatar?: string
          role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          plan?: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'BUSINESS' | 'ENTERPRISE'
        }
        Update: {
          name?: string
          avatar?: string
          role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          plan?: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'BUSINESS' | 'ENTERPRISE'
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          slug: string
          source_type: 'WEBSITE_URL' | 'GITHUB_REPO' | 'SOURCE_CODE' | 'ZIP_UPLOAD'
          website_url: string | null
          github_url: string | null
          status: 'IMPORTING' | 'ANALYZING' | 'ANALYZED' | 'GENERATING' | 'READY' | 'BUILDING' | 'COMPLETED' | 'FAILED'
          owner_id: string
          organization_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string
          slug: string
          source_type: 'WEBSITE_URL' | 'GITHUB_REPO' | 'SOURCE_CODE' | 'ZIP_UPLOAD'
          website_url?: string
          github_url?: string
          owner_id: string
          organization_id?: string
        }
        Update: {
          name?: string
          description?: string
          status?: 'IMPORTING' | 'ANALYZING' | 'ANALYZED' | 'GENERATING' | 'READY' | 'BUILDING' | 'COMPLETED' | 'FAILED'
          settings?: Record<string, any>
        }
      }
      build_jobs: {
        Row: {
          id: string
          project_id: string
          platform: 'DESKTOP_WINDOWS' | 'DESKTOP_MACOS' | 'DESKTOP_LINUX' | 'ANDROID' | 'IOS' | 'PWA'
          format: 'EXE' | 'MSI' | 'APP' | 'DMG' | 'APPIMAGE' | 'SNAP' | 'DEB' | 'APK' | 'AAB' | 'IPA' | 'DOCKER' | 'SOURCE'
          version: string
          build_number: number
          status: 'QUEUED' | 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RETRYING'
          progress: number
          artifact_url: string | null
          queued_at: string
          started_at: string | null
          completed_at: string | null
        }
        Insert: {
          project_id: string
          platform: 'DESKTOP_WINDOWS' | 'DESKTOP_MACOS' | 'DESKTOP_LINUX' | 'ANDROID' | 'IOS' | 'PWA'
          format: 'EXE' | 'MSI' | 'APP' | 'DMG' | 'APPIMAGE' | 'SNAP' | 'DEB' | 'APK' | 'AAB' | 'IPA' | 'DOCKER' | 'SOURCE'
          version: string
          build_number: number
        }
        Update: {
          status?: 'QUEUED' | 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RETRYING'
          progress?: number
          artifact_url?: string
          completed_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'BUILD_COMPLETE' | 'BUILD_FAILED' | 'ANALYSIS_COMPLETE' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'SUBSCRIPTION_EXPIRING' | 'SECURITY_ALERT' | 'SYSTEM'
          title: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          type: 'BUILD_COMPLETE' | 'BUILD_FAILED' | 'ANALYSIS_COMPLETE' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'SUBSCRIPTION_EXPIRING' | 'SECURITY_ALERT' | 'SYSTEM'
          title: string
          message: string
          data?: Record<string, any>
        }
        Update: {
          is_read?: boolean
          read_at?: string
        }
      }
    }
    Functions: {
      get_user_stats: {
        Args: { user_uuid: string }
        Returns: Record<string, any>
      }
      check_user_permission: {
        Args: { user_uuid: string; permission: string }
        Returns: boolean
      }
      deduct_ai_credits: {
        Args: { user_uuid: string; amount: number; description?: string; build_uuid?: string; project_uuid?: string }
        Returns: boolean
      }
    }
  }
}
