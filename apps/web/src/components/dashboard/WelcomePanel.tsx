'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WelcomePanel() {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6 shadow-premium-glow">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            New experience
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Turn any website into a native-ready app flow.
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Start with a URL, review the AI analysis, and generate polished app packages for iOS, Android, desktop, and PWA.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            Create your first project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
