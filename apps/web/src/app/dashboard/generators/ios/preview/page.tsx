'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RotateCw, Wifi, Monitor, Sun, Moon, BatteryMedium, Signal } from 'lucide-react'

export default function IosPreviewPage() {
  const [isLandscape, setIsLandscape] = useState(false)
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Preview</h1>
          <p className="text-muted-foreground mt-1">Test how your web app behaves within the native iOS wrapper.</p>
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
          {/* iOS Device Mockup (iPhone Pro style with Dynamic Island) */}
          <div className={`relative bg-black rounded-[3.5rem] border-[14px] border-zinc-800 shadow-2xl transition-all duration-500 ease-in-out ${isLandscape ? 'w-[844px] h-[390px]' : 'w-[390px] h-[844px]'}`}>
              
              {/* Dynamic Island / Notch Area */}
              <div className={`absolute z-20 bg-black rounded-full transition-all duration-300 ${isLandscape ? 'left-6 top-1/2 -translate-y-1/2 w-6 h-[100px]' : 'top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px]'}`} />

              {/* Status Bar */}
              <div className={`absolute top-0 inset-x-0 h-14 flex justify-between items-center px-8 text-xs font-semibold z-10 ${isDark ? 'text-white' : 'text-black'}`}>
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                      <Signal className="h-3 w-3" />
                      <Wifi className="h-3 w-3" />
                      <BatteryMedium className="h-4 w-4" />
                  </div>
              </div>

              {/* Screen Area */}
              <div className="absolute inset-0 bg-white rounded-[2.8rem] overflow-hidden flex flex-col">
                  {/* Mock Webview Content */}
                  <div className={`flex-1 flex flex-col pt-14 pb-8 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} transition-colors`}>
                      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                          <h2 className="text-3xl font-bold mb-6">Discover</h2>
                          <div className={`h-48 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} animate-pulse`} />
                          
                          <h3 className="text-xl font-semibold mt-6 mb-3">Trending</h3>
                          <div className="flex gap-4 overflow-x-hidden">
                              <div className={`h-32 w-32 shrink-0 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} animate-pulse`} />
                              <div className={`h-32 w-32 shrink-0 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} animate-pulse`} />
                              <div className={`h-32 w-32 shrink-0 rounded-2xl ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} animate-pulse`} />
                          </div>
                      </div>
                      
                      {/* iOS Bottom Tab Bar Mock */}
                      <div className={`h-20 border-t flex justify-around items-center px-6 pb-4 ${isDark ? 'bg-zinc-900/80 border-white/10 backdrop-blur-xl' : 'bg-white/80 border-gray-200 backdrop-blur-xl'}`}>
                          <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/10'}`} />
                          <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                          <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                          <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                      </div>
                  </div>
              </div>

              {/* Home Indicator */}
              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-full z-20 ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>
      </div>
    </div>
  )
}
