'use client'

import { CreateProgressCard } from '@/components/projects/CreateProgressCard'

const steps = [
  {
    step: 1,
    title: 'Import your website',
    description: 'Submit a URL or repository and let the platform inspect the structure.',
  },
  {
    step: 2,
    title: 'Review AI insights',
    description: 'Inspect the detected screens, routes, and app requirements.',
  },
  {
    step: 3,
    title: 'Generate native packages',
    description: 'Build iOS, Android, desktop, and PWA bundles from the same workflow.',
  },
]

export function ProjectCreationJourney() {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-background/60 p-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">How it works</p>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">Create a project in three simple steps</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((item) => (
          <CreateProgressCard key={item.step} step={item.step} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  )
}
