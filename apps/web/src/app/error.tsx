'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-white/10 p-10 text-center shadow-premium-glow">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Unexpected error
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Something went wrong while loading this view.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
          {error.message || 'Please try again. If the issue continues, refresh the page or contact support.'}
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
