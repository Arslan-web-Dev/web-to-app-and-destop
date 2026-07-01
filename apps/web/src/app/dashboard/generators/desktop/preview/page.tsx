'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Apple, Command, Maximize2, Minus, X } from 'lucide-react'

export default function DesktopPreviewPage() {
  const [os, setOs] = useState<'mac' | 'win'>('mac')

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Desktop Preview</h1>
          <p className="text-muted-foreground mt-1">Test how your web app behaves within the native Desktop wrapper.</p>
        </div>
        <div className="flex bg-background/50 rounded-lg p-1 border border-white/10">
            <Button variant={os === 'mac' ? 'default' : 'ghost'} size="sm" onClick={() => setOs('mac')} className={os === 'mac' ? 'bg-white/10 text-white' : 'text-muted-foreground'}>
                <Apple className="h-4 w-4 mr-2" /> macOS
            </Button>
            <Button variant={os === 'win' ? 'default' : 'ghost'} size="sm" onClick={() => setOs('win')} className={os === 'win' ? 'bg-white/10 text-white' : 'text-muted-foreground'}>
                <Monitor className="h-4 w-4 mr-2" /> Windows
            </Button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border-white/10 p-8 flex items-center justify-center overflow-hidden bg-black/20 shadow-premium-glow relative">
          
          {/* Desktop Window Mockup */}
          <div className={`relative w-[900px] h-[550px] bg-background border flex flex-col shadow-2xl transition-all duration-300 ${os === 'mac' ? 'rounded-xl border-white/20' : 'rounded-md border-white/10'}`}>
              
              {/* Title Bar */}
              <div className={`h-12 shrink-0 flex items-center px-4 z-10 border-b border-white/5 ${os === 'mac' ? 'justify-center bg-gradient-to-b from-white/10 to-transparent' : 'justify-between bg-black/40'}`}>
                  {os === 'mac' && (
                      <div className="absolute left-4 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600/50" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/50" />
                      </div>
                  )}
                  
                  {os === 'win' && (
                      <div className="flex items-center gap-3 text-xs">
                          <Monitor className="h-4 w-4 text-primary" />
                          <span className="font-medium">My Awesome App</span>
                      </div>
                  )}

                  {os === 'mac' && (
                      <span className="font-semibold text-sm">My Awesome App</span>
                  )}

                  {os === 'win' && (
                      <div className="flex gap-4 items-center opacity-50">
                          <Minus className="h-4 w-4" />
                          <Maximize2 className="h-3 w-3" />
                          <X className="h-4 w-4" />
                      </div>
                  )}
              </div>

              {/* Window Content */}
              <div className="flex-1 flex overflow-hidden bg-[#030209] text-white">
                  {/* Sidebar Mock */}
                  <div className="w-64 border-r border-white/10 p-4 space-y-4 bg-white/[0.02]">
                      <div className="h-8 w-3/4 rounded-md bg-white/10 animate-pulse" />
                      <div className="space-y-2 mt-8">
                          <div className="h-10 w-full rounded-md bg-primary/20" />
                          <div className="h-10 w-full rounded-md bg-white/5 animate-pulse" />
                          <div className="h-10 w-full rounded-md bg-white/5 animate-pulse" />
                      </div>
                  </div>
                  
                  {/* Main Content Mock */}
                  <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                      <div className="flex justify-between items-center">
                          <div className="h-8 w-48 rounded-md bg-white/10 animate-pulse" />
                          <div className="h-10 w-32 rounded-md bg-primary/20" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6">
                          <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                          <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                          <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
                      </div>

                      <div className="h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-8">
                           <div className="w-full space-y-4">
                                <div className="h-6 w-1/3 rounded bg-white/10 animate-pulse" />
                                <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
                                <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
                                <div className="h-4 w-2/3 rounded bg-white/5 animate-pulse" />
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
