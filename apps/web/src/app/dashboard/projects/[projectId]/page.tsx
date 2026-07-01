'use client'

import { useParams } from 'next/navigation'
import { useProject, useRealtimeBuilds } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Wrench, Globe, ExternalLink, ArrowLeft, CheckCircle2, AlertTriangle, Play, Shield } from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailsPage() {
  const { projectId } = useParams() as { projectId: string }
  const { data: project, isLoading, error } = useProject(projectId)
  useRealtimeBuilds(projectId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="text-center py-12 space-y-4">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Failed to load project</h2>
        <p className="text-muted-foreground">The project may not exist or you don't have access.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{project.website_url}</span>
              <a
                href={project.website_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/projects/${projectId}/analysis`}>
              <Shield className="mr-2 h-4 w-4" />
              AI Analysis
            </Link>
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" />
            New Build
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold">App Overview</h2>
            <p className="text-muted-foreground">
              {project.description || 'No description provided for this project.'}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-bold">Source Type</p>
                <p className="text-lg font-semibold mt-1">{project.source_type}</p>
              </div>
              <div className="border rounded-md p-4 bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                <Badge variant="secondary" className="mt-1">
                  {project.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Builds History */}
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Build Jobs
              </h2>
            </div>
            <div className="divide-y">
              {project.build_jobs?.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No build jobs configured yet. Create a build to compile your app.
                </div>
              ) : (
                project.build_jobs?.map((build: any) => (
                  <div key={build.id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">
                        {build.platform} — v{build.version} (Build #{build.build_number})
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Queued: {new Date(build.queued_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          build.status === 'COMPLETED'
                            ? 'default'
                            : build.status === 'FAILED'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {build.status}
                      </Badge>
                      {build.artifact_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={build.artifact_url} download>
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg">AI Recommendation Summary</h3>
            {project.recommendations && project.recommendations.length > 0 ? (
              <ul className="space-y-2">
                {project.recommendations.slice(0, 3).map((rec: any) => (
                  <li key={rec.id} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{rec.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Run AI Analysis to get optimization recommendations for your native app.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
