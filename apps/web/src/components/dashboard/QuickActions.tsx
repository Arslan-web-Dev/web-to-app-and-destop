'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Wrench, Settings, CreditCard } from 'lucide-react'

const actions = [
  {
    label: 'New Project',
    href: '/dashboard/projects',
    icon: Plus,
    description: 'Convert a website to an app',
  },
  {
    label: 'View Builds',
    href: '/dashboard/builds',
    icon: Wrench,
    description: 'Check your build history',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'Manage your account',
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
    description: 'Manage your subscription',
  },
]

export function QuickActions() {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Quick Actions</h2>
      </div>
      <div className="p-4 space-y-2">
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3">
              <action.icon className="h-4 w-4 shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
