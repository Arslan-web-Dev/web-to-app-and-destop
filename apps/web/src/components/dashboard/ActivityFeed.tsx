'use client'

import { useNotifications } from '@/hooks/useProjects'
import { Bell } from 'lucide-react'

export function ActivityFeed() {
  const { data: notifications, isLoading } = useNotifications()

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b flex items-center gap-2">
        <Bell className="h-4 w-4" />
        <h2 className="font-semibold">Activity</h2>
      </div>
      <div className="divide-y max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading...</div>
        ) : notifications?.length === 0 || !notifications ? (
          <div className="p-4 text-sm text-muted-foreground">No recent activity.</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="p-4">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(n.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
