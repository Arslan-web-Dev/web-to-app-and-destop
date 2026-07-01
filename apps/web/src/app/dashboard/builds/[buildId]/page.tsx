'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Smartphone, Download, RefreshCw, XCircle, CheckCircle2 } from 'lucide-react'

export default function BuildDetailsPage({ params }: { params: { buildId: string } }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-white/10">
          <Link href="/dashboard/builds">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Build #{params.buildId}</h1>
            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20">Success</Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            My E-commerce App
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 hover:bg-white/5"><RefreshCw className="mr-2 h-4 w-4" /> Rebuild</Button>
            <Button variant="destructive" disabled className="bg-destructive/80"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6 shadow-sm">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Build Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Platform</p>
                    <p className="font-semibold text-lg">Android</p>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Version</p>
                    <p className="font-semibold text-lg">1.0.4</p>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Duration</p>
                    <p className="font-semibold text-lg flex items-center gap-1.5"><Clock className="h-4 w-4 text-muted-foreground" /> 3m 42s</p>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold tracking-wider">Size</p>
                    <p className="font-semibold text-lg">24.5 MB</p>
                </div>
            </div>
          </div>

          <div className="glass-panel p-0 rounded-2xl overflow-hidden flex flex-col h-[500px] border-white/10">
             <div className="p-4 border-b border-white/10 bg-black/60 flex justify-between items-center backdrop-blur-md">
                 <h2 className="text-sm font-semibold font-mono text-muted-foreground">build_output.log</h2>
                 <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                 </div>
             </div>
             <div className="flex-1 bg-[#0a0a0a] p-6 font-mono text-sm overflow-y-auto space-y-2 leading-relaxed">
                 <div className="text-muted-foreground">08:42:10 - Starting build process...</div>
                 <div className="text-cyan-400">08:42:11 - Fetching source repository...</div>
                 <div className="text-cyan-400">08:42:15 - Installing dependencies...</div>
                 <div className="text-gray-300">08:43:00 - Compiling native assets...</div>
                 <div className="text-gray-300">08:44:20 - Running Gradle build tasks...</div>
                 <div className="text-yellow-400">08:45:10 - WARN: Deprecated API usage detected in plugin: `core-splashscreen`</div>
                 <div className="text-gray-300">08:45:45 - Signing APK...</div>
                 <div className="text-emerald-400 font-bold mt-4 pt-4 border-t border-white/10">08:45:52 - Build completed successfully!</div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
                <h2 className="text-xl font-semibold">Artifacts</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-background/50 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                        <div>
                            <p className="font-semibold">app-release.apk</p>
                            <p className="text-xs text-muted-foreground mt-0.5">24.5 MB</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-lg h-9"><Download className="h-4 w-4 mr-1.5" /> APK</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-background/50 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                        <div>
                            <p className="font-semibold">app-release.aab</p>
                            <p className="text-xs text-muted-foreground mt-0.5">28.1 MB</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-lg h-9"><Download className="h-4 w-4 mr-1.5" /> AAB</Button>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
                <h2 className="text-xl font-semibold">Timeline</h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-emerald-500/20 before:to-transparent">
                    {[
                        { time: '08:42 AM', title: 'Queued', active: true },
                        { time: '08:42 AM', title: 'Initializing worker', active: true },
                        { time: '08:43 AM', title: 'Compiling', active: true },
                        { time: '08:45 AM', title: 'Packaging', active: true },
                        { time: '08:45 AM', title: 'Complete', active: true },
                    ].map((step, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 bg-background text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0 z-10 relative">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-white/5 bg-background/50 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm">{step.title}</h3>
                                    <time className="text-xs text-muted-foreground font-mono">{step.time}</time>
                                </div>
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
