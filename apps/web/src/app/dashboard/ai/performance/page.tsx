'use client'

import { Badge } from '@/components/ui/badge'
import { Zap, Timer, Server, Activity, ArrowDown, ArrowUp } from 'lucide-react'

export default function PerformanceAnalysisPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Analysis</h1>
        <p className="text-muted-foreground mt-1">Core Web Vitals and loading speed optimization metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 md:col-span-1 flex flex-col justify-center items-center text-center shadow-premium-glow">
              <div className="text-5xl font-bold text-gradient-primary mb-2">88</div>
              <h2 className="font-semibold">Performance Score</h2>
              <p className="text-xs text-yellow-500 mt-1">Needs Improvement</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 md:col-span-3">
              <h3 className="font-semibold mb-4 text-lg">Core Web Vitals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-background/50 p-4 rounded-xl border border-yellow-500/20">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">LCP (Largest Contentful Paint)</p>
                      <div className="flex items-end gap-2 mt-2">
                          <span className="text-2xl font-bold text-yellow-500">2.8s</span>
                          <span className="text-xs text-yellow-500 pb-1">Average</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-3">
                          <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '65%' }} />
                      </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-emerald-500/20">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">FID (First Input Delay)</p>
                      <div className="flex items-end gap-2 mt-2">
                          <span className="text-2xl font-bold text-emerald-500">42ms</span>
                          <span className="text-xs text-emerald-500 pb-1">Good</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-3">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '20%' }} />
                      </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-emerald-500/20">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">CLS (Cumulative Layout Shift)</p>
                      <div className="flex items-end gap-2 mt-2">
                          <span className="text-2xl font-bold text-emerald-500">0.04</span>
                          <span className="text-xs text-emerald-500 pb-1">Good</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mt-3">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '15%' }} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Server className="h-5 w-5 text-blue-500" /> Bundle Analysis</h3>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>JavaScript</span>
                      </div>
                      <span className="font-mono text-sm">842 KB</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span>Images</span>
                      </div>
                      <span className="font-mono text-sm">1.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                          <span>CSS</span>
                      </div>
                      <span className="font-mono text-sm">124 KB</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Fonts</span>
                      </div>
                      <span className="font-mono text-sm">256 KB</span>
                  </div>
                  <div className="w-full h-4 bg-white/5 rounded-full flex overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: '35%' }}></div>
                      <div className="bg-pink-500 h-full" style={{ width: '45%' }}></div>
                      <div className="bg-emerald-500 h-full" style={{ width: '5%' }}></div>
                      <div className="bg-yellow-500 h-full" style={{ width: '15%' }}></div>
                  </div>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" /> Optimization Suggestions</h3>
              <div className="space-y-3">
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 flex gap-3">
                      <ArrowDown className="h-5 w-5 text-yellow-500 shrink-0" />
                      <div>
                          <p className="font-semibold text-sm">Reduce unused JavaScript</p>
                          <p className="text-xs text-muted-foreground mt-1">Potential savings of 240 KB. Consider code splitting your React components.</p>
                      </div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 flex gap-3">
                      <ArrowDown className="h-5 w-5 text-emerald-500 shrink-0" />
                      <div>
                          <p className="font-semibold text-sm">Serve images in next-gen formats</p>
                          <p className="text-xs text-muted-foreground mt-1">Convert PNGs to WebP to save up to 450 KB.</p>
                      </div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-white/5 flex gap-3">
                      <ArrowUp className="h-5 w-5 text-blue-500 shrink-0" />
                      <div>
                          <p className="font-semibold text-sm">Enable text compression</p>
                          <p className="text-xs text-muted-foreground mt-1">GZIP or Brotli compression is active and saving bandwidth.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
