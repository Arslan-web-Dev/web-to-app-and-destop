import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Project } from '@/hooks/useProjects'

export interface ProjectCardProps {
  project: Project
  viewMode?: 'grid' | 'list'
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode = 'grid' }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.12)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'group rounded-2xl border border-white/10 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30',
        viewMode === 'list' && 'flex items-center gap-4'
      )}
    >
      <div className={cn('flex-1', viewMode === 'list' && 'flex items-center gap-6')}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
          <div className="h-2.5 w-2.5 rounded-full bg-secondary" />
        </div>
        <p className="mb-3 text-sm leading-6 text-muted-foreground">
          {project.description || 'No description provided.'}
        </p>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Status: {project.status}</Badge>
          <Badge variant="outline">Created: {new Date(project.created_at).toLocaleDateString()}</Badge>
        </div>
      </div>
      <div className="flex justify-end">
        <Button asChild>
          <a href={`/dashboard/projects/${project.id}`}>View Details</a>
        </Button>
      </div>
    </motion.div>
  )
}

export default ProjectCard
