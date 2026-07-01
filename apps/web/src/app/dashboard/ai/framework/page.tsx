'use client'

import { Badge } from '@/components/ui/badge'
import { Code, Terminal, Boxes, LayoutTemplate, Puzzle } from 'lucide-react'

export default function FrameworkDetectionPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Framework Detection</h1>
        <p className="text-muted-foreground mt-1">AI-powered identification of tech stack and dependencies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                  <LayoutTemplate className="h-6 w-6" />
                  <h2 className="font-semibold text-lg text-white">Frontend Framework</h2>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">Nx</div>
                      <span className="font-semibold text-lg">Next.js 14</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-0">99% Match</Badge>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-secondary">
                  <Puzzle className="h-6 w-6" />
                  <h2 className="font-semibold text-lg text-white">CSS Framework</h2>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#38bdf8] rounded-full flex items-center justify-center text-white font-bold text-xs">TW</div>
                      <span className="font-semibold text-lg">Tailwind CSS</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-0">95% Match</Badge>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 text-blue-500">
                  <Terminal className="h-6 w-6" />
                  <h2 className="font-semibold text-lg text-white">Build Tool</h2>
              </div>
              <div className="flex justify-between items-center bg-background/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xs">Wp</div>
                      <span className="font-semibold text-lg">Webpack</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-0">88% Match</Badge>
              </div>
          </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-white/10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Boxes className="h-6 w-6 text-primary" /> Detected Dependencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['react', 'react-dom', 'framer-motion', 'lucide-react', 'radix-ui', 'zod', 'react-hook-form', 'zustand'].map(dep => (
                  <div key={dep} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="font-mono text-sm">{dep}</span>
                      </div>
                      <Badge variant="outline" className="border-white/10 text-muted-foreground">Compatible</Badge>
                  </div>
              ))}
          </div>
      </div>
    </div>
  )
}
