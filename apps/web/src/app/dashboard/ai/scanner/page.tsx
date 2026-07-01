'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Globe, Search, Loader2, CheckCircle2, FileText, Image as ImageIcon, Database } from 'lucide-react'

export default function WebsiteScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScan = () => {
      setScanning(true)
      setProgress(10)
      setTimeout(() => setProgress(40), 1000)
      setTimeout(() => setProgress(75), 2000)
      setTimeout(() => { setProgress(100); setScanning(false) }, 3500)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Website Scanner</h1>
        <p className="text-muted-foreground mt-1">Deep crawl your website to discover assets, pages, and structure.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl shadow-premium-glow text-center space-y-6">
          <div className="max-w-2xl mx-auto relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input 
                  placeholder="https://example.com" 
                  className="h-16 pl-14 text-xl bg-background/50 border-white/10 rounded-xl"
                  disabled={scanning}
              />
              <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-gradient-to-r from-primary to-secondary text-white border-0"
                  onClick={handleScan}
                  disabled={scanning}
              >
                  {scanning ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Scanning</> : <><Search className="mr-2 h-5 w-5" /> Start Scan</>}
              </Button>
          </div>

          {progress > 0 && (
              <div className="max-w-2xl mx-auto space-y-2 pt-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{progress === 100 ? 'Scan Complete' : 'Analyzing structure...'}</span>
                      <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
              </div>
          )}
      </div>

      {progress === 100 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="glass-panel p-6 rounded-xl text-center space-y-2 border-white/5">
                  <div className="mx-auto w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center"><FileText className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-bold">24</h3>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">Pages Found</p>
              </div>
              <div className="glass-panel p-6 rounded-xl text-center space-y-2 border-white/5">
                  <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center"><ImageIcon className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-bold">142</h3>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">Assets</p>
              </div>
              <div className="glass-panel p-6 rounded-xl text-center space-y-2 border-white/5">
                  <div className="mx-auto w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center"><Database className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-bold">6</h3>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">APIs Detected</p>
              </div>
              <div className="glass-panel p-6 rounded-xl text-center space-y-2 border-white/5">
                  <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center"><CheckCircle2 className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-bold text-gradient-primary">98%</h3>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">Native Ready</p>
              </div>
          </div>
      )}
    </div>
  )
}
