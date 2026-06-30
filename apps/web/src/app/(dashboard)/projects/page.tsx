'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Grid3X3, List } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and generate native apps from your websites
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : filteredProjects?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {filteredProjects?.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
