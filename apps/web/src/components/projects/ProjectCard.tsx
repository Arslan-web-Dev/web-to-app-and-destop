// apps/web/src/components/projects/ProjectCard.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/hooks/useProjects';

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={cn('rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow')}>
      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">
        {project.description || 'No description provided.'}
      </p>
      <div className="flex items-center space-x-2 mb-2">
        <Badge variant="secondary">Status: {project.status}</Badge>
        <Badge variant="outline">Created: {new Date(project.created_at).toLocaleDateString()}</Badge>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" asChild>
          <a href={`/dashboard/projects/${project.id}`}>View Details</a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
