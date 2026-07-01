'use client'

import { Badge } from '@/components/ui/badge'
import { Accessibility, CheckCircle2, AlertTriangle, XCircle, Eye } from 'lucide-react'

export default function AccessibilityAnalysisPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accessibility Analysis</h1>
        <p className="text-muted-foreground mt-1">WCAG 2.1 compliance and inclusive design checks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-2xl border-white/10 flex flex-col items-center justify-center text-center shadow-premium-glow">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[8px] border-emerald-500/20 mb-4">
                  <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-r-transparent transform rotate-45"></div>
                  <span className="text-4xl font-bold text-emerald-500">94</span>
              </div>
              <h2 className="text-xl font-bold">Accessibility Score</h2>
              <Badge className="mt-2 bg-emerald-500/10 text-emerald-500 border-0">WCAG 2.1 AA Compliant</Badge>
          </div>

          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Accessibility className="h-5 w-5 text-indigo-500" /> Compliance by Category</h3>
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Perceivable</span>
                          <span className="text-emerald-500">95%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }} />
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Operable</span>
                          <span className="text-emerald-500">100%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Understandable</span>
                          <span className="text-yellow-500">80%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }} />
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Robust</span>
                          <span className="text-emerald-500">100%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-white/10 space-y-6">
          <h2 className="text-xl font-semibold">Detected Issues</h2>
          
          <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-background/50 rounded-xl border border-yellow-500/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                      <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-yellow-500">Color Contrast Warning</h4>
                          <Badge variant="outline" className="text-xs text-muted-foreground border-white/10">Understandable</Badge>
                      </div>
                      <p className="text-sm text-gray-300">Some text elements have a contrast ratio of 3.8:1, which is below the recommended 4.5:1 for normal text.</p>
                      <div className="bg-black/40 p-3 rounded text-xs font-mono border border-white/5 text-gray-400">
                          &lt;span class="text-gray-400 bg-white"&gt;Read more&lt;/span&gt;
                      </div>
                  </div>
              </div>

              <div className="flex gap-4 p-4 bg-background/50 rounded-xl border border-red-500/20">
                  <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                      <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-red-500">Missing Form Labels</h4>
                          <Badge variant="outline" className="text-xs text-muted-foreground border-white/10">Perceivable</Badge>
                      </div>
                      <p className="text-sm text-gray-300">A form input element does not have an associated label or aria-label attribute.</p>
                      <div className="bg-black/40 p-3 rounded text-xs font-mono border border-white/5 text-gray-400">
                          &lt;input type="text" placeholder="Search..." /&gt;
                      </div>
                  </div>
              </div>

              <div className="flex gap-4 p-4 bg-background/50 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                      <h4 className="font-semibold text-emerald-500">Screen Reader Compatibility</h4>
                      <p className="text-sm text-gray-300">All ARIA roles are correctly formatted and interactive elements are keyboard accessible.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
