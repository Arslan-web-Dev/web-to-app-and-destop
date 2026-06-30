'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  CreditCard,
  Settings,
  Users,
  Bell,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { supabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  user: {
    id: string
    email: string
    name?: string
    avatar?: string
    plan?: string
  }
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Builds', href: '/dashboard/builds', icon: Wrench },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex flex-col w-64 bg-card border-r">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Universal</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium">
              {user.name?.charAt(0) || user.email?.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name || user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.plan || 'Free'} Plan</p>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
