'use client'

import { useProjects, useBuilds } from '@/hooks/useProjects'
import { FolderKanban, Wrench, CheckCircle2, Clock } from 'lucide-react'

export function StatsCards() {
  const { data: projects } = useProjects()
  const { data: builds } = useBuilds()

  const completedBuilds = builds?.filter((b) => b.status === 'COMPLETED').length ?? 0
  const pendingBuilds = builds?.filter(
    (b) => b.status === 'QUEUED' || b.status === 'RUNNING' || b.status === 'PENDING'
  ).length ?? 0

  const stats = [
    {
      label: 'Total Projects',
      value: projects?.length ?? 0,
      icon: FolderKanban,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      label: 'Total Builds',
      value: builds?.length ?? 0,
      icon: Wrench,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-950',
    },
    {
      label: 'Completed',
      value: completedBuilds,
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950',
    },
    {
      label: 'In Progress',
      value: pendingBuilds,
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-950',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border bg-card p-6 shadow-sm flex items-center gap-4"
        >
          <div className={`p-3 rounded-full ${stat.bg}`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
