'use client'

import { Badge } from '@/components/ui/badge'
import { Server, Activity, Clock, CheckCircle2, AlertTriangle, XCircle, Cpu } from 'lucide-react'

export default function BuildSystemDashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Build System Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time status of the global build infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center shadow-premium-glow">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2">
                  <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gradient-primary">12</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Active Builds</h2>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold">4</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">In Queue</h2>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-emerald-500">98.4%</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Success Rate (24h)</h2>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-2">
                  <Cpu className="h-6 w-6 text-pink-500" />
              </div>
              <div className="text-3xl font-bold">2m 45s</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Avg Build Time</h2>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><Server className="h-5 w-5 text-primary" /> Active Builds</h2>
                  <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 animate-pulse">Live Updates</Badge>
              </div>
              <div className="space-y-3">
                  {[
                      { id: 'bld_7x9q', project: 'E-Commerce App', platform: 'iOS', progress: 65, status: 'Compiling Swift' },
                      { id: 'bld_2m4p', project: 'Portfolio Native', platform: 'Android', progress: 82, status: 'Signing APK' },
                      { id: 'bld_9k1w', project: 'SaaS Dashboard', platform: 'Desktop (macOS)', progress: 15, status: 'Installing Deps' },
                  ].map(build => (
                      <div key={build.id} className="p-4 bg-background/50 rounded-xl border border-white/5 space-y-3">
                          <div className="flex justify-between items-center">
                              <div>
                                  <h3 className="font-semibold">{build.project}</h3>
                                  <p className="text-xs text-muted-foreground font-mono">{build.id} • {build.platform}</p>
                              </div>
                              <div className="text-right">
                                  <span className="text-sm font-bold text-primary">{build.progress}%</span>
                                  <p className="text-xs text-muted-foreground">{build.status}</p>
                              </div>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: `${build.progress}%` }} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><Cpu className="h-5 w-5 text-indigo-500" /> Build Workers</h2>
                  <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span className="text-sm">Available</span>
                          </div>
                          <span className="font-bold">24</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                              <span className="text-sm">Busy</span>
                          </div>
                          <span className="font-bold">12</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="text-sm">Offline</span>
                          </div>
                          <span className="font-bold">2</span>
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
                  <h2 className="text-lg font-semibold">Resource Utilization</h2>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Global CPU</span>
                              <span className="text-yellow-500">78%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5">
                              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                          </div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Global Memory</span>
                              <span className="text-emerald-500">45%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5">
                              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '45%' }} />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
