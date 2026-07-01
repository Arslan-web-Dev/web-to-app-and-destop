'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ListOrdered, Clock, Play, Pause, AlertTriangle } from 'lucide-react'

export default function BuildQueuePage() {
  const queue = [
      { id: 'bld_1x8y', project: 'Social Network App', platform: 'Android', priority: 'Critical', queued: '2 mins ago', wait: '1m 30s' },
      { id: 'bld_9b3c', project: 'Crypto Wallet', platform: 'iOS', priority: 'High', queued: '5 mins ago', wait: '3m 00s' },
      { id: 'bld_4p2m', project: 'Restaurant POS', platform: 'Desktop', priority: 'Normal', queued: '12 mins ago', wait: '5m 45s' },
      { id: 'bld_7v5n', project: 'News Reader', platform: 'Android', priority: 'Low', queued: '15 mins ago', wait: '10m 00s' },
  ]

  const priorityColors: Record<string, string> = {
      Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
      High: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      Normal: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Low: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Build Queue</h1>
          <p className="text-muted-foreground mt-1">Manage pending build jobs and priorities.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 text-orange-500 hover:text-orange-400 hover:bg-orange-500/10">
                <Pause className="h-4 w-4 mr-2" /> Pause Queue
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold">4</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Total in Queue</h2>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-yellow-500">5m 03s</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Avg Wait Time</h2>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col justify-center items-center text-center">
              <div className="text-3xl font-bold text-emerald-500">42 / hr</div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase mt-1">Processing Rate</h2>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ListOrdered className="h-4 w-4" />
                  <span>Drag items to reorder priority (Admin only)</span>
              </div>
          </div>
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">Pos</th>
                      <th className="px-6 py-4 font-semibold">Project</th>
                      <th className="px-6 py-4 font-semibold">Platform</th>
                      <th className="px-6 py-4 font-semibold">Priority</th>
                      <th className="px-6 py-4 font-semibold">Queued</th>
                      <th className="px-6 py-4 font-semibold text-right">Est. Wait</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {queue.map((item, i) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors cursor-move">
                          <td className="px-6 py-4 font-mono text-muted-foreground">#{i + 1}</td>
                          <td className="px-6 py-4">
                              <div className="font-medium text-white">{item.project}</div>
                              <div className="text-xs text-muted-foreground font-mono">{item.id}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{item.platform}</td>
                          <td className="px-6 py-4">
                              <Badge variant="outline" className={priorityColors[item.priority]}>{item.priority}</Badge>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-xs">
                              {item.queued}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <span className="flex items-center justify-end gap-1 text-yellow-500 font-mono text-xs">
                                  <Clock className="h-3 w-3" /> {item.wait}
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}
