// apps/web/src/components/projects/ProjectCard.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/hooks/useProjects';

export interface ProjectCardProps {
  project: Project;
  viewMode?: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode = 'grid' }) => {
  return (
    <div className={cn(
      'rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow',
      viewMode === 'list' && 'flex items-center gap-4'
    )}>
      <div className={cn('flex-1', viewMode === 'list' && 'flex items-center gap-6')}>
        <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {project.description || 'No description provided.'}
        </p>
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary">Status: {project.status}</Badge>
          <Badge variant="outline">Created: {new Date(project.created_at).toLocaleDateString()}</Badge>
        </div>
      </div>
      <div className="flex justify-end">
        {/* Use default variant — 'primary' is not a valid variant */}
        <Button variant="default" asChild>
          <a href={`/dashboard/projects/${project.id}`}>View Details</a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
