'use client'

import { Badge } from '@/components/ui/badge'
import { Activity, Cpu, HardDrive, Network, Zap } from 'lucide-react'

export default function UsagePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usage & Limits</h1>
        <p className="text-muted-foreground mt-1">Track your resource consumption for the current billing cycle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Cpu className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                      <h2 className="text-lg font-semibold">Build Minutes</h2>
                      <p className="text-sm text-muted-foreground">Time spent compiling apps</p>
                  </div>
              </div>
              
              <div>
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">142<span className="text-lg font-medium text-muted-foreground">/500m</span></span>
                      <span className="text-sm font-medium text-blue-500">28% Used</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '28%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-right">Resets in 12 days</p>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <HardDrive className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                      <h2 className="text-lg font-semibold">Artifact Storage</h2>
                      <p className="text-sm text-muted-foreground">Space used by IPAs, AABs, etc.</p>
                  </div>
              </div>
              
              <div>
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">1.2<span className="text-lg font-medium text-muted-foreground">/5GB</span></span>
                      <span className="text-sm font-medium text-emerald-500">24% Used</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '24%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-right">Auto-deletes after 30 days</p>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                      <h2 className="text-lg font-semibold">AI Scans</h2>
                      <p className="text-sm text-muted-foreground">Website analysis runs</p>
                  </div>
              </div>
              
              <div>
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">85<span className="text-lg font-medium text-muted-foreground">/100</span></span>
                      <span className="text-sm font-medium text-yellow-500">85% Used</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-yellow-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-right">Consider upgrading your plan</p>
              </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Network className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                      <h2 className="text-lg font-semibold">API Requests</h2>
                      <p className="text-sm text-muted-foreground">External API calls</p>
                  </div>
              </div>
              
              <div>
                  <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-bold">12.4k<span className="text-lg font-medium text-muted-foreground">/50k</span></span>
                      <span className="text-sm font-medium text-pink-500">25% Used</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div className="bg-pink-500 h-full rounded-full" style={{ width: '25%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-right">Resets in 12 days</p>
              </div>
          </div>
      </div>
    </div>
  )
}
