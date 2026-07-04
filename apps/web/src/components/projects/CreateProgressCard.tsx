'use client'

interface CreateProgressCardProps {
  step: number
  title: string
  description: string
}

export function CreateProgressCard({ step, title, description }: CreateProgressCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <span className="text-sm font-semibold">{step}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
