'use client'

import { useBuilds } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import { Wrench } from 'lucide-react'

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  COMPLETED: 'default',
  FAILED: 'destructive',
  RUNNING: 'secondary',
  QUEUED: 'outline',
  PENDING: 'outline',
  CANCELLED: 'outline',
  RETRYING: 'secondary',
}

export function RecentBuilds() {
  const { data: builds, isLoading } = useBuilds()
  const recent = builds?.slice(0, 5)

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b flex items-center gap-2">
        <Wrench className="h-4 w-4" />
        <h2 className="font-semibold">Recent Builds</h2>
      </div>
      <div className="divide-y">
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading...</div>
        ) : recent?.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">No builds yet.</div>
        ) : (
          recent?.map((build) => (
            <div key={build.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">
                  {build.platform} — v{build.version}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(build.queued_at).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={statusVariant[build.status] ?? 'outline'}>{build.status}</Badge>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
