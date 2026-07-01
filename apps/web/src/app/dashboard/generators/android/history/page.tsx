'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Filter, MoreVertical, Smartphone, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function AndroidHistoryPage() {
  const builds = [
      { id: 'bld_1', version: '1.0.4', date: 'Just now', duration: '2m 14s', status: 'success', size: '14.2 MB', type: 'AAB' },
      { id: 'bld_2', version: '1.0.3', date: '2 hours ago', duration: '2m 05s', status: 'success', size: '14.1 MB', type: 'AAB' },
      { id: 'bld_3', version: '1.0.2', date: 'Yesterday', duration: '45s', status: 'failed', size: '-', type: 'APK' },
      { id: 'bld_4', version: '1.0.2', date: 'Yesterday', duration: '1m 58s', status: 'success', size: '28.4 MB', type: 'APK' },
      { id: 'bld_5', version: '1.0.1', date: '3 days ago', duration: '2m 20s', status: 'success', size: '13.8 MB', type: 'AAB' },
      { id: 'bld_6', version: '1.0.0', date: '1 week ago', duration: '3m 10s', status: 'success', size: '13.5 MB', type: 'AAB' },
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Android Build History</h1>
        <p className="text-muted-foreground mt-1">Past builds, artifacts, and logs for your Android app.</p>
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
              <Smartphone className="h-4 w-4" />
              <span>Storage Used: <span className="text-white font-medium">84.0 MB</span> / 2 GB</span>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">Build ID / Version</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Duration</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Artifact Size</th>
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
                              {build.status === 'success' ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0 flex w-fit items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Success</Badge>
                              ) : (
                                  <Badge className="bg-red-500/10 text-red-500 border-0 flex w-fit items-center gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>
                              )}
                          </td>
                          <td className="px-6 py-4">
                              {build.status === 'success' ? (
                                  <Badge variant="outline" className="border-white/10 font-mono text-xs">{build.type} • {build.size}</Badge>
                              ) : (
                                  <span className="text-muted-foreground">-</span>
                              )}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                  {build.status === 'success' && (
                                      <Button variant="ghost" size="icon" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
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
