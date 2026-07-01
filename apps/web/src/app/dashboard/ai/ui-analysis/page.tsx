'use client'

import { Badge } from '@/components/ui/badge'
import { Layout, Palette, Type, Maximize, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function UIAnalysisPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UI Analysis</h1>
        <p className="text-muted-foreground mt-1">Extract design tokens, colors, and components for native rendering.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col h-[400px]">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Layout className="h-5 w-5 text-primary" /> Visual Hierarchy</h2>
                  <div className="flex-1 bg-black/50 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                      {/* Placeholder for screenshot/wireframe */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      <div className="text-center space-y-2 relative z-10">
                          <Maximize className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-muted-foreground">Interactive DOM Layout Map</p>
                      </div>
                      
                      {/* Mock highlighting boxes */}
                      <div className="absolute top-4 left-4 right-4 h-16 border-2 border-primary/50 bg-primary/10 rounded-lg flex items-center justify-center text-xs text-primary font-mono">Navbar (Navigation)</div>
                      <div className="absolute top-24 left-4 w-64 bottom-4 border-2 border-secondary/50 bg-secondary/10 rounded-lg flex items-center justify-center text-xs text-secondary font-mono">Sidebar (Aside)</div>
                      <div className="absolute top-24 left-72 right-4 bottom-4 border-2 border-blue-500/50 bg-blue-500/10 rounded-lg flex items-center justify-center text-xs text-blue-500 font-mono">Main Content Area</div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Type className="h-5 w-5 text-blue-500" /> Typography</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-background/50 p-4 rounded-xl border border-white/5 space-y-3">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Primary Font (Headings)</p>
                          <p className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>Inter</p>
                          <div className="flex gap-2">
                              <Badge variant="outline" className="bg-white/5">700 (Bold)</Badge>
                              <Badge variant="outline" className="bg-white/5">800 (ExtraBold)</Badge>
                          </div>
                      </div>
                      <div className="bg-background/50 p-4 rounded-xl border border-white/5 space-y-3">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Secondary Font (Body)</p>
                          <p className="text-xl" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto</p>
                          <div className="flex gap-2">
                              <Badge variant="outline" className="bg-white/5">400 (Regular)</Badge>
                              <Badge variant="outline" className="bg-white/5">500 (Medium)</Badge>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Palette className="h-5 w-5 text-pink-500" /> Color Palette</h2>
                  <div className="space-y-4">
                      <div>
                          <p className="text-xs text-muted-foreground mb-2">Primary Colors</p>
                          <div className="flex gap-3">
                              <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: '#6366f1' }} title="#6366f1"></div>
                              <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: '#4f46e5' }} title="#4f46e5"></div>
                          </div>
                      </div>
                      <div>
                          <p className="text-xs text-muted-foreground mb-2">Secondary/Accent</p>
                          <div className="flex gap-3">
                              <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: '#10b981' }} title="#10b981"></div>
                              <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: '#06b6d4' }} title="#06b6d4"></div>
                          </div>
                      </div>
                      <div>
                          <p className="text-xs text-muted-foreground mb-2">Background & Text</p>
                          <div className="flex gap-3">
                              <div className="w-12 h-12 rounded-full shadow-lg border border-white/20" style={{ backgroundColor: '#030209' }} title="#030209"></div>
                              <div className="w-12 h-12 rounded-full shadow-lg border border-white/20" style={{ backgroundColor: '#f8fafc' }} title="#f8fafc"></div>
                              <div className="w-12 h-12 rounded-full shadow-lg border border-white/20" style={{ backgroundColor: '#94a3b8' }} title="#94a3b8"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10">
                  <h2 className="text-lg font-semibold mb-4">Detected Components</h2>
                  <div className="space-y-3">
                      {[
                          { name: 'Buttons', count: 42, status: 'ok' },
                          { name: 'Forms', count: 3, status: 'ok' },
                          { name: 'Cards', count: 18, status: 'ok' },
                          { name: 'Modals', count: 2, status: 'warn' },
                          { name: 'Navigation Bars', count: 1, status: 'ok' },
                      ].map(comp => (
                          <div key={comp.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                              <span className="font-medium text-sm">{comp.name}</span>
                              <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground font-mono">{comp.count}</span>
                                  {comp.status === 'ok' ? 
                                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : 
                                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                  }
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
