'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Smartphone, Play, Image as ImageIcon, CheckCircle2, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AndroidSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Android Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your Android app parameters before building.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" asChild className="border-white/10">
                <Link href="/dashboard/generators/android/preview">Preview App</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                <Link href="/dashboard/generators/android/build"><Play className="h-4 w-4 mr-2" /> Start Build</Link>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><Smartphone className="h-5 w-5 text-emerald-500" /> App Identity</h2>
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label>App Name</Label>
                          <Input defaultValue="My Awesome App" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label>Package Name (Application ID)</Label>
                          <Input defaultValue="com.universal.myapp" className="bg-background/50 border-white/10 font-mono text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label>Version Name</Label>
                              <Input defaultValue="1.0.0" className="bg-background/50 border-white/10" />
                          </div>
                          <div className="space-y-2">
                              <Label>Version Code</Label>
                              <Input type="number" defaultValue="1" className="bg-background/50 border-white/10" />
                          </div>
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2"><Shield className="h-5 w-5 text-blue-500" /> Permissions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['INTERNET', 'CAMERA', 'ACCESS_FINE_LOCATION', 'POST_NOTIFICATIONS', 'READ_EXTERNAL_STORAGE', 'RECORD_AUDIO'].map(perm => (
                          <label key={perm} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-background/30 hover:bg-white/5 cursor-pointer transition-colors group">
                              <input type="checkbox" defaultChecked={['INTERNET', 'POST_NOTIFICATIONS'].includes(perm)} className="accent-emerald-500 w-4 h-4" />
                              <span className="font-mono text-xs text-muted-foreground group-has-[:checked]:text-emerald-500 transition-colors">{perm}</span>
                          </label>
                      ))}
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
                  <h2 className="text-lg font-semibold">App Icon</h2>
                  <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-3xl bg-background/50 border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-muted-foreground hover:bg-white/5 hover:border-primary/50 transition-colors cursor-pointer group">
                          <ImageIcon className="h-8 w-8 mb-2 group-hover:text-primary transition-colors" />
                          <span className="text-xs">Upload PNG</span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">Upload a 1024x1024 transparent PNG. We'll automatically generate all required sizes including adaptive icons.</p>
                  </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-6">
                  <h2 className="text-lg font-semibold">Build Settings</h2>
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label>Build Variant</Label>
                          <select className="w-full h-10 px-3 bg-background/50 border border-white/10 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary">
                              <option>Release (AAB)</option>
                              <option>Debug (APK)</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <Label>Min SDK Version</Label>
                          <select className="w-full h-10 px-3 bg-background/50 border border-white/10 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary">
                              <option>API 24 (Android 7.0) - 96% of devices</option>
                              <option>API 26 (Android 8.0) - 90% of devices</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <Label>Target SDK Version</Label>
                          <select className="w-full h-10 px-3 bg-background/50 border border-white/10 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary">
                              <option>API 34 (Android 14)</option>
                              <option>API 33 (Android 13)</option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
