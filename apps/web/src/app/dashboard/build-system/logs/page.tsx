'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Terminal, Filter, RefreshCw } from 'lucide-react'

export default function BuildLogsPage() {
  const [level, setLevel] = useState('All')

  const logs = [
      { timestamp: '2023-11-20 14:23:45', level: 'INFO', msg: 'System initialized. Worker ID: wrk_092x' },
      { timestamp: '2023-11-20 14:23:46', level: 'INFO', msg: 'Accepting job bld_7x9q from queue...' },
      { timestamp: '2023-11-20 14:23:48', level: 'DEBUG', msg: 'Fetching repository state (branch: main)' },
      { timestamp: '2023-11-20 14:23:55', level: 'INFO', msg: 'Dependencies installed successfully. (Time: 7s)' },
      { timestamp: '2023-11-20 14:24:02', level: 'WARN', msg: 'Deprecated API usage detected in src/utils/api.ts' },
      { timestamp: '2023-11-20 14:24:10', level: 'INFO', msg: 'Compiling native assets...' },
      { timestamp: '2023-11-20 14:25:30', level: 'ERROR', msg: 'Failed to resolve module "react-native-gesture-handler"' },
      { timestamp: '2023-11-20 14:25:31', level: 'INFO', msg: 'Aborting build. Cleaning up workspace...' },
  ]

  const levelColors: Record<string, string> = {
      INFO: 'text-blue-400',
      DEBUG: 'text-gray-400',
      WARN: 'text-yellow-400',
      ERROR: 'text-red-400 font-bold',
  }

  const filteredLogs = level === 'All' ? logs : logs.filter(l => l.level === level)

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground mt-1">Global build runner logs and system events.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="border-white/10">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button variant="outline" className="border-white/10">
                <Download className="h-4 w-4 mr-2" /> Export
            </Button>
        </div>
      </div>

      <div className="flex gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-9 bg-background/50 border-white/10" />
          </div>
          <div className="flex bg-background/50 rounded-md border border-white/10 p-1">
              {['All', 'INFO', 'WARN', 'ERROR', 'DEBUG'].map(l => (
                  <button 
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${level === l ? 'bg-white/10 text-white' : 'text-muted-foreground hover:text-white'}`}
                  >
                      {l}
                  </button>
              ))}
          </div>
      </div>

      <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-premium-glow">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2 shrink-0">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">syslog</span>
              <div className="ml-auto flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-primary" />
                      Auto-scroll
                  </label>
              </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5">
              {filteredLogs.map((log, i) => (
                  <div key={i} className="flex hover:bg-white/[0.02] px-2 py-0.5 rounded transition-colors group">
                      <span className="text-gray-500 w-36 shrink-0">{log.timestamp}</span>
                      <span className={`${levelColors[log.level]} w-16 shrink-0`}>[{log.level}]</span>
                      <span className="text-gray-300 break-all">{log.msg}</span>
                  </div>
              ))}
              <div className="text-gray-600 animate-pulse mt-2 px-2">_</div>
          </div>
      </div>
    </div>
  )
}
