import { StatsCards } from '@/components/dashboard/StatsCards'
import { RecentProjects } from '@/components/dashboard/RecentProjects'
import { RecentBuilds } from '@/components/dashboard/RecentBuilds'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { WelcomePanel } from '@/components/dashboard/WelcomePanel'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here is an overview of your projects and builds.
        </p>
      </div>

      <WelcomePanel />
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentProjects />
          <RecentBuilds />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
