'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download, ShieldCheck, Activity, Key, LogIn, Trash2, Edit } from 'lucide-react'

export default function TeamAuditPage() {
  const auditLogs = [
      { id: 'al_1', actor: 'Alice Johnson', action: 'Created API Key', target: 'Prod Server Key', date: 'Oct 24, 2023 14:32:01', ip: '192.168.1.1', icon: Key, color: 'text-yellow-500' },
      { id: 'al_2', actor: 'Bob Smith', action: 'Triggered Build', target: 'Social Network (iOS)', date: 'Oct 24, 2023 12:15:22', ip: '10.0.0.5', icon: Activity, color: 'text-blue-500' },
      { id: 'al_3', actor: 'System', action: 'Deleted Artifact', target: 'CryptoWallet_v1.0.apk', date: 'Oct 23, 2023 00:00:01', ip: 'localhost', icon: Trash2, color: 'text-red-500' },
      { id: 'al_4', actor: 'Charlie Davis', action: 'Logged In', target: 'Dashboard', date: 'Oct 22, 2023 09:12:44', ip: '203.0.113.42', icon: LogIn, color: 'text-emerald-500' },
      { id: 'al_5', actor: 'Alice Johnson', action: 'Updated Settings', target: 'Billing details', date: 'Oct 21, 2023 16:45:10', ip: '192.168.1.1', icon: Edit, color: 'text-gray-400' },
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track security-relevant activity across your workspace.</p>
        </div>
        <Button variant="outline" className="border-white/10 bg-background/50">
            <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs by user, action, or IP..." className="pl-9 bg-background/50 border-white/10" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20 text-emerald-500">
              <ShieldCheck className="h-4 w-4" />
              <span>Security monitoring active</span>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">Event</th>
                      <th className="px-6 py-4 font-semibold">Actor</th>
                      <th className="px-6 py-4 font-semibold">Target</th>
                      <th className="px-6 py-4 font-semibold">IP Address</th>
                      <th className="px-6 py-4 font-semibold text-right">Timestamp</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                  <div className="p-1.5 bg-white/5 rounded-md">
                                      <log.icon className={`h-4 w-4 ${log.color}`} />
                                  </div>
                                  <span className="font-medium text-white">{log.action}</span>
                              </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                              {log.actor}
                          </td>
                          <td className="px-6 py-4 text-gray-400">
                              {log.target}
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-500">
                              {log.ip}
                          </td>
                          <td className="px-6 py-4 text-right text-xs text-muted-foreground">
                              {log.date}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  )
}
