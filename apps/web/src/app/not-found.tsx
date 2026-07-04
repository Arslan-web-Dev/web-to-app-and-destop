import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-white/10 p-10 text-center shadow-premium-glow">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="h-8 w-8" />
        </div>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          404 • Page not found
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          The page you are looking for has drifted off course.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
          It may have moved, been removed, or never existed. Head back to the dashboard or start a new project from here.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
