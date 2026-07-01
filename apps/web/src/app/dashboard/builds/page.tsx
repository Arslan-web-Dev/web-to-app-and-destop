'use client'

import { useBuilds } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Wrench, Play, Download, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  COMPLETED: 'default',
  FAILED: 'destructive',
  RUNNING: 'secondary',
  QUEUED: 'outline',
  PENDING: 'outline',
  CANCELLED: 'outline',
  RETRYING: 'secondary',
}

export default function BuildsPage() {
  const { data: builds, isLoading, error } = useBuilds()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Builds</h1>
          <p className="text-muted-foreground mt-1">
            Track and download your compiled native application packages.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects">
            <Play className="mr-2 h-4 w-4" />
            New Build
          </Link>
        </Button>
      </div>

      {/* Builds List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 space-y-4">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">Failed to load builds</h2>
          <p className="text-muted-foreground">An error occurred while fetching build history.</p>
        </div>
      ) : builds?.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg bg-card">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No build history</h3>
          <p className="text-muted-foreground mt-1">Select a project to initiate your first native app build.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/projects">Go to Projects</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg bg-card shadow-sm divide-y">
          {builds?.map((build) => (
            <div key={build.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base">{build.platform}</h3>
                  <Badge variant={statusVariant[build.status] ?? 'outline'}>{build.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Version: <span className="font-medium">{build.version}</span> (Build #{build.build_number})
                </p>
                <p className="text-xs text-muted-foreground">
                  Queued: {new Date(build.queued_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {build.artifact_url && (
                  <Button size="sm" asChild>
                    <a href={build.artifact_url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
