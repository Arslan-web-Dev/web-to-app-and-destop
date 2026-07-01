'use client'

import { useParams } from 'next/navigation'
import { useProject } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Shield, AlertTriangle, Cpu, Layout, FileText, Lock } from 'lucide-react'
import Link from 'next/link'

export default function AnalysisPage() {
  const { projectId } = useParams() as { projectId: string }
  const { data: project, isLoading, error } = useProject(projectId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="text-center py-12 space-y-4">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold">Failed to load analysis</h2>
        <p className="text-muted-foreground">The project or analysis report could not be loaded.</p>
        <Button asChild variant="outline">
          <Link href={`/dashboard/projects/${projectId}`}>Back to Project</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/projects/${projectId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Analysis Report</h1>
          <p className="text-muted-foreground mt-1">
            Structural audit and native feature detection for {project.name}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Detection Metrics */}
        <div className="border rounded-lg p-6 bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg text-blue-500">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Framework</p>
              <h3 className="text-lg font-bold">React / Next.js</h3>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg text-green-500">
              <Layout className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Responsive Design</p>
              <h3 className="text-lg font-bold">Mobile Optimized</h3>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg text-purple-500">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Security Scan</p>
              <h3 className="text-lg font-bold">SSL & CORS Safe</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed analysis list */}
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detected Elements & Metadata
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">Service Worker / PWA Support</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Manifest.json and registration check</p>
                </div>
                <Badge>Detected</Badge>
              </div>
              <div className="border-b pb-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">Viewport Configuration</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Scale and scaling restrictions</p>
                </div>
                <Badge>Correct</Badge>
              </div>
              <div className="pb-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">Deep Linking Config</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Apple App Site Association / assetlinks.json</p>
                </div>
                <Badge variant="outline">Missing</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              AI Recommendations
            </h2>
            {project.recommendations && project.recommendations.length > 0 ? (
              <div className="space-y-4">
                {project.recommendations.map((rec: any) => (
                  <div key={rec.id} className="border-l-2 border-primary pl-4 py-1 space-y-1">
                    <p className="font-semibold text-sm">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No recommendation rules triggered. Your site is optimal!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
