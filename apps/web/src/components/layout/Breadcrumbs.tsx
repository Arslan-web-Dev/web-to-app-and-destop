'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (!segments.length || !segments.includes('dashboard')) {
    return null
  }

  const crumbs = segments
    .slice(segments.indexOf('dashboard'))
    .reduce<Array<{ label: string; href: string }>>((items, segment, index) => {
      const href = `/${segments.slice(0, segments.indexOf('dashboard') + index + 1).join('/')}`
      items.push({ label: index === 0 ? 'Dashboard' : formatSegment(segment), href })
      return items
    }, [])

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1

        return (
          <div key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className={cn('transition-colors hover:text-foreground')}>
                {crumb.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
