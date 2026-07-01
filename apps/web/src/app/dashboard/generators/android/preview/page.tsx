'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Smartphone, Monitor, RotateCw, Wifi, WifiOff, Sun, Moon } from 'lucide-react'

export default function AndroidPreviewPage() {
  const [isLandscape, setIsLandscape] = useState(false)
  const [isDark, setIsDark] = useState(true)

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Preview</h1>
          <p className="text-muted-foreground mt-1">Test how your web app behaves within the native Android wrapper.</p>
        </div>
        <div className="flex bg-background/50 rounded-lg p-1 border border-white/10">
            <Button variant="ghost" size="sm" onClick={() => setIsLandscape(!isLandscape)} className="text-muted-foreground hover:text-white">
                <RotateCw className="h-4 w-4 mr-2" /> Rotate
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)} className="text-muted-foreground hover:text-white">
                {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />} 
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border-white/10 p-8 flex items-center justify-center overflow-hidden bg-black/20 shadow-premium-glow relative">
          <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="outline" className="bg-white/5 border-white/10"><Wifi className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" className="bg-white/5 border-white/10"><Monitor className="h-4 w-4" /></Button>
          </div>

          {/* Android Device Mockup */}
          <div className={`relative bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl transition-all duration-500 ease-in-out ${isLandscape ? 'w-[800px] h-[380px]' : 'w-[380px] h-[800px]'}`}>
              {/* Status Bar */}
              <div className="absolute top-0 inset-x-0 h-8 flex justify-between items-center px-6 text-[10px] text-white z-10 font-medium">
                  <span>12:00</span>
                  <div className="flex items-center gap-1">
                      <Wifi className="h-3 w-3" />
                      <span>100%</span>
                  </div>
              </div>

              {/* Screen Area */}
              <div className="absolute inset-x-1 inset-y-1 bg-white rounded-[2.5rem] overflow-hidden mt-6 mb-2 flex flex-col">
                  {/* Mock Webview Content */}
                  <div className={`flex-1 flex flex-col ${isDark ? 'bg-[#030209] text-white' : 'bg-gray-50 text-gray-900'} transition-colors`}>
                      <div className={`h-14 flex items-center px-4 font-semibold border-b ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-sm`}>
                          MyApp
                      </div>
                      <div className="flex-1 p-6 space-y-4">
                          <div className={`h-32 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-200'} animate-pulse`} />
                          <div className={`h-8 w-3/4 rounded-md ${isDark ? 'bg-white/5' : 'bg-gray-200'} animate-pulse`} />
                          <div className={`h-4 w-full rounded-sm ${isDark ? 'bg-white/5' : 'bg-gray-200'} animate-pulse`} />
                          <div className={`h-4 w-5/6 rounded-sm ${isDark ? 'bg-white/5' : 'bg-gray-200'} animate-pulse`} />
                          <div className="grid grid-cols-2 gap-4 mt-8">
                              <div className={`h-24 rounded-xl ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`} />
                              <div className={`h-24 rounded-xl ${isDark ? 'bg-secondary/20' : 'bg-secondary/10'}`} />
                          </div>
                      </div>
                  </div>
              </div>

              {/* Navigation Bar */}
              <div className="absolute bottom-1 inset-x-0 h-6 flex justify-center items-center gap-12 z-10">
                  <div className="w-12 h-1 bg-white/30 rounded-full" />
              </div>
          </div>
      </div>
    </div>
  )
}
