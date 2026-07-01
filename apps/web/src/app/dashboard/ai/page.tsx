'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
    Brain, Scan, Code, Layout, Lock, Search, Zap, 
    Accessibility, Lightbulb, ArrowRight, Activity 
} from 'lucide-react'

export default function AIEngineDashboard() {
  const tools = [
    { name: 'Website Scanner', href: '/dashboard/ai/scanner', icon: Scan, desc: 'Deep crawl and asset discovery', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Framework Detection', href: '/dashboard/ai/framework', icon: Code, desc: 'Identify tech stack and libraries', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'UI Analysis', href: '/dashboard/ai/ui-analysis', icon: Layout, desc: 'Extract components and colors', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { name: 'API Detection', href: '/dashboard/ai/api-detection', icon: Activity, desc: 'Discover endpoints and schemas', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Security Scan', href: '/dashboard/ai/security', icon: Lock, desc: 'Vulnerability assessment', color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'SEO Analysis', href: '/dashboard/ai/seo', icon: Search, desc: 'Search engine optimization check', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Performance', href: '/dashboard/ai/performance', icon: Zap, desc: 'Core Web Vitals and load times', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { name: 'Accessibility', href: '/dashboard/ai/accessibility', icon: Accessibility, desc: 'WCAG compliance checking', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: 'Recommendations', href: '/dashboard/ai/recommendations', icon: Lightbulb, desc: 'AI-generated native optimizations', color: 'text-primary', bg: 'bg-primary/10' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              AI Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Powerful AI tools to analyze and optimize your web apps for native conversion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Brain className="h-16 w-16" /></div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Scans</p>
            <p className="text-3xl font-bold mt-2">1,284</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Success Rate</p>
            <p className="text-3xl font-bold mt-2 text-emerald-500">98.2%</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-semibold">Avg Processing Time</p>
            <p className="text-3xl font-bold mt-2">2.4s</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5">
            <p className="text-xs text-muted-foreground uppercase font-semibold">AI Credits Used</p>
            <p className="text-3xl font-bold mt-2">450 / 1000</p>
            <div className="w-full bg-background rounded-full h-1.5 mt-3">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }} />
            </div>
        </div>
      </div>

      <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                  <Link key={tool.name} href={tool.href} className="group block">
                      <div className="glass-panel p-6 rounded-2xl border-white/10 hover:border-primary/50 transition-all hover:shadow-premium-glow bg-background/30 hover:bg-white/[0.02]">
                          <div className="flex justify-between items-start">
                              <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} mb-4`}>
                                  <tool.icon className="h-6 w-6" />
                              </div>
                              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                          </div>
                          <h3 className="font-semibold text-lg">{tool.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
                      </div>
                  </Link>
              ))}
          </div>
      </div>
    </div>
  )
}
