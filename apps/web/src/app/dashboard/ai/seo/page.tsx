'use client'

import { Badge } from '@/components/ui/badge'
import { Search, Globe, Image as ImageIcon, Heading, FileText, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'

export default function SEOAnalysisPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Analysis</h1>
        <p className="text-muted-foreground mt-1">Search Engine Optimization metrics and metadata checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 md:col-span-1 flex flex-col justify-center items-center text-center shadow-premium-glow">
              <div className="text-5xl font-bold text-gradient-neon mb-2">92</div>
              <h2 className="font-semibold">SEO Score</h2>
              <p className="text-xs text-emerald-500 mt-1">Excellent</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 md:col-span-3">
              <h3 className="font-semibold mb-4 text-lg flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Meta Tags</h3>
              <div className="space-y-4">
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-300">Title Tag</span>
                          <span className="text-emerald-500 flex items-center gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Perfect length (54 chars)</span>
                      </div>
                      <p className="text-xl font-semibold text-blue-400">Universal Web to Native | Convert Websites to Apps</p>
                  </div>
                  <div>
                      <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-300">Meta Description</span>
                          <span className="text-emerald-500 flex items-center gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Perfect length (142 chars)</span>
                      </div>
                      <p className="text-sm text-gray-400">Transform your existing web application into high-performance native iOS, Android, and Desktop apps in minutes using our advanced AI engine.</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">og:title detected</Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">og:image detected</Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">twitter:card detected</Badge>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Heading className="h-5 w-5 text-pink-500" /> Heading Hierarchy</h3>
              <div className="bg-background/50 rounded-xl p-4 border border-white/5 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3 text-emerald-400">
                      <Badge variant="outline" className="w-10 justify-center">H1</Badge>
                      <span className="truncate">Convert Websites to Apps</span>
                  </div>
                  <div className="flex items-center gap-3 ml-4 text-gray-300">
                      <Badge variant="outline" className="w-10 justify-center">H2</Badge>
                      <span className="truncate">How it works</span>
                  </div>
                  <div className="flex items-center gap-3 ml-8 text-gray-400">
                      <Badge variant="outline" className="w-10 justify-center">H3</Badge>
                      <span className="truncate">AI Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 ml-4 text-gray-300">
                      <Badge variant="outline" className="w-10 justify-center">H2</Badge>
                      <span className="truncate">Pricing Plans</span>
                  </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Logical heading structure detected.
              </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><ImageIcon className="h-5 w-5 text-secondary" /> Image Alt Text</h3>
              <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-sm">Total Images</span>
                      <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-sm">With Alt Text</span>
                      <span className="font-semibold text-emerald-500">22</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-red-500/20">
                      <span className="text-sm">Missing Alt Text</span>
                      <span className="font-semibold text-red-500">2</span>
                  </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2 text-yellow-500">
                  <AlertTriangle className="h-3 w-3" /> Missing alt text on 2 images (hero-bg.png, spacer.gif).
              </p>
          </div>
      </div>
    </div>
  )
}
