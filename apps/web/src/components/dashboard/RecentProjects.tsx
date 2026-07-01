'use client'

import { useProjects } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FolderKanban } from 'lucide-react'

export function RecentProjects() {
  const { data: projects, isLoading } = useProjects()
  const recent = projects?.slice(0, 5)

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <FolderKanban className="h-4 w-4" />
          Recent Projects
        </h2>
        <Link href="/dashboard/projects" className="text-xs text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="divide-y">
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">Loading...</div>
        ) : recent?.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">No projects yet.</div>
        ) : (
          recent?.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="flex items-center justify-between p-4 hover:bg-accent transition-colors"
            >
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="secondary">{project.status}</Badge>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
