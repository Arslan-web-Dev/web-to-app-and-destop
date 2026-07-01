'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Filter, MoreVertical, Monitor, Apple, Box, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function DesktopHistoryPage() {
  const builds = [
      { id: 'bld_1', version: '1.0.4', date: 'Just now', duration: '3m 45s', status: 'success', targets: ['mac', 'win', 'linux'] },
      { id: 'bld_2', version: '1.0.3', date: '2 hours ago', duration: '3m 30s', status: 'success', targets: ['mac', 'win'] },
      { id: 'bld_3', version: '1.0.2', date: 'Yesterday', duration: '1m 12s', status: 'failed', targets: ['mac', 'win', 'linux'] },
      { id: 'bld_4', version: '1.0.2', date: 'Yesterday', duration: '3m 20s', status: 'success', targets: ['mac', 'win', 'linux'] },
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Desktop Build History</h1>
        <p className="text-muted-foreground mt-1">Past cross-compiled builds for macOS, Windows, and Linux.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4">
              <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search builds..." className="pl-9 bg-background/50 border-white/10" />
              </div>
              <Button variant="outline" className="border-white/10 bg-background/50">
                  <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <Monitor className="h-4 w-4" />
              <span>Storage Used: <span className="text-white font-medium">420.5 MB</span> / 2 GB</span>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">Version</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Duration</th>
                      <th className="px-6 py-4 font-semibold">Targets</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {builds.map((build) => (
                      <tr key={build.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                              <div className="font-medium text-white">{build.version} <span className="text-xs text-muted-foreground ml-2 font-mono">{build.id}</span></div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{build.date}</td>
                          <td className="px-6 py-4 text-gray-400 font-mono text-xs flex items-center gap-2">
                              <Clock className="h-3 w-3" /> {build.duration}
                          </td>
                          <td className="px-6 py-4">
                              <div className="flex gap-2">
                                  {build.targets.includes('mac') && <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20" title="macOS"><Apple className="h-3 w-3 mr-1" /> DMG</Badge>}
                                  {build.targets.includes('win') && <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20" title="Windows"><Monitor className="h-3 w-3 mr-1" /> MSI</Badge>}
                                  {build.targets.includes('linux') && <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20" title="Linux"><Box className="h-3 w-3 mr-1" /> AppImage</Badge>}
                              </div>
                          </td>
                          <td className="px-6 py-4">
                              {build.status === 'success' ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0 flex w-fit items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Success</Badge>
                              ) : (
                                  <Badge className="bg-red-500/10 text-red-500 border-0 flex w-fit items-center gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>
                              )}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                  {build.status === 'success' && (
                                      <Button variant="ghost" size="icon" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10" title="Download All">
                                          <Download className="h-4 w-4" />
                                      </Button>
                                  )}
                                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                                      <MoreVertical className="h-4 w-4" />
                                  </Button>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}
