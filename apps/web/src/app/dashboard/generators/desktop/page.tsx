'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Monitor, Play, Image as ImageIcon, Settings, LayoutTemplate } from 'lucide-react'
import Link from 'next/link'

export default function DesktopSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Desktop Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your macOS, Windows, and Linux app parameters.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" asChild className="border-white/10">
                <Link href="/dashboard/generators/desktop/preview">Preview App</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                <Link href="/dashboard/generators/desktop/build"><Play className="h-4 w-4 mr-2" /> Start Build</Link>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6 shadow-sm">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><Monitor className="h-5 w-5 text-indigo-500" /> App Identity</h2>
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label>App Name</Label>
                          <Input defaultValue="My Awesome App" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>App ID (Bundle Identifier / Executable Name)</Label>
                          <Input defaultValue="com.universal.myapp" className="bg-background/50 border-white/10 font-mono text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label>Version</Label>
                              <Input defaultValue="1.0.0" className="bg-background/50 border-white/10" />
                          </div>
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6 shadow-sm">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><LayoutTemplate className="h-5 w-5 text-blue-500" /> Window Configuration</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <Label>Default Width (px)</Label>
                          <Input type="number" defaultValue="1200" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>Default Height (px)</Label>
                          <Input type="number" defaultValue="800" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>Min Width (px)</Label>
                          <Input type="number" defaultValue="400" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>Min Height (px)</Label>
                          <Input type="number" defaultValue="600" className="bg-background/50 border-white/10" />
                      </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Resizable Window', 'Fullscreen Support', 'System Tray Icon', 'Hidden on Launch'].map(opt => (
                          <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-background/30 hover:bg-white/5 cursor-pointer transition-colors group">
                              <input type="checkbox" defaultChecked={['Resizable Window', 'Fullscreen Support'].includes(opt)} className="accent-primary w-4 h-4" />
                              <span className="font-medium text-sm text-muted-foreground group-has-[:checked]:text-white transition-colors">{opt}</span>
                          </label>
                      ))}
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6 shadow-sm">
                  <h2 className="text-lg font-semibold">App Icon</h2>
                  <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-3xl bg-background/50 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-muted-foreground hover:bg-white/5 hover:border-primary/50 transition-colors cursor-pointer group">
                          <ImageIcon className="h-8 w-8 mb-2 group-hover:text-primary transition-colors" />
                          <span className="text-xs">Upload PNG</span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Upload a 1024x1024 PNG. We will generate .icns (macOS), .ico (Windows), and .png (Linux).</p>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Target Platforms</h2>
                  <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30 hover:bg-white/5 cursor-pointer transition-colors group">
                          <span className="font-medium text-sm text-muted-foreground group-has-[:checked]:text-white transition-colors">macOS (.dmg, .app)</span>
                          <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30 hover:bg-white/5 cursor-pointer transition-colors group">
                          <span className="font-medium text-sm text-muted-foreground group-has-[:checked]:text-white transition-colors">Windows (.exe, .msi)</span>
                          <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-background/30 hover:bg-white/5 cursor-pointer transition-colors group">
                          <span className="font-medium text-sm text-muted-foreground group-has-[:checked]:text-white transition-colors">Linux (.AppImage, .deb)</span>
                          <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                      </label>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
