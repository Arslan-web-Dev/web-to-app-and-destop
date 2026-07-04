'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Globe, Sparkles, Smartphone, Monitor } from 'lucide-react'
import { ProjectCreationJourney } from '@/components/projects/ProjectCreationJourney'

export default function CreateProjectPage() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-white/10">
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground mt-1">
            Convert your website into a native application.
          </p>
        </div>
      </div>

      <ProjectCreationJourney />

      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-8 shadow-premium-glow">
        <form onSubmit={handleScan} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="url" 
                  type="url" 
                  placeholder="https://example.com" 
                  className="pl-10 h-12 text-lg bg-background/50 border-white/10"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white border-0" disabled={isScanning}>
                {isScanning ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 animate-pulse" /> Scanning...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> Auto-Detect
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Project Name</Label>
            <Input placeholder="My App" className="h-11 bg-background/50 border-white/10" />
          </div>
          <div className="space-y-4">
            <Label>Description (Optional)</Label>
            <Input placeholder="A brief description of your app" className="h-11 bg-background/50 border-white/10" />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Target Platforms</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'android', name: 'Android', icon: Smartphone },
              { id: 'ios', name: 'iOS', icon: Smartphone },
              { id: 'desktop', name: 'Desktop', icon: Monitor },
            ].map((platform) => (
              <label key={platform.id} className="relative flex flex-col items-center justify-center gap-3 p-6 border border-white/10 bg-background/30 rounded-xl cursor-pointer hover:bg-white/5 transition-all group overflow-hidden">
                <input type="checkbox" className="absolute opacity-0" defaultChecked />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                <platform.icon className="h-8 w-8 text-muted-foreground group-has-[:checked]:text-primary relative z-10 transition-colors" />
                <span className="font-medium group-has-[:checked]:text-white relative z-10 text-muted-foreground transition-colors">{platform.name}</span>
                <div className="absolute inset-0 border-2 border-transparent rounded-xl group-has-[:checked]:border-primary/50 pointer-events-none transition-colors" />
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4 border-t border-white/5">
          <Button variant="ghost" asChild>
            <Link href="/dashboard/projects">Cancel</Link>
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-8">
            Create Project
          </Button>
        </div>
      </div>
    </div>
  )
}
