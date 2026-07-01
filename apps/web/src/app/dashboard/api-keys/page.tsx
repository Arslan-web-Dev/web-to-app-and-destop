'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Key, Copy, Plus, Trash2, Eye, EyeOff, AlertTriangle, ExternalLink } from 'lucide-react'

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState<number | null>(null)

  const keys = [
    { id: 1, name: 'Production API Key', key: 'uwtn_live_9a8b7c6d5e4f3g2h1i', created: '2026-05-10', lastUsed: '2 hours ago', status: 'Active' },
    { id: 2, name: 'Development Key', key: 'uwtn_test_1a2b3c4d5e6f7g8h9i', created: '2026-06-01', lastUsed: '5 days ago', status: 'Active' },
  ]

  const maskKey = (key: string) => {
    return key.substring(0, 10) + '•'.repeat(16)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage your API keys for programmatic access to Universal Web to Native.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary text-white border-0">
          <Plus className="mr-2 h-4 w-4" /> Generate New Key
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl md:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold">Active Keys</h2>
              <div className="space-y-4">
                  {keys.map((k) => (
                      <div key={k.id} className="border border-white/10 bg-background/30 p-4 rounded-xl space-y-4 hover:border-white/20 transition-colors">
                          <div className="flex justify-between items-start">
                              <div>
                                  <h3 className="font-semibold">{k.name}</h3>
                                  <p className="text-xs text-muted-foreground mt-0.5">Created on {k.created}</p>
                              </div>
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{k.status}</Badge>
                          </div>
                          <div className="flex gap-2">
                              <div className="relative flex-1">
                                  <Input 
                                      value={showKey === k.id ? k.key : maskKey(k.key)}
                                      readOnly
                                      className="font-mono text-sm bg-black/40 border-white/10 pr-10"
                                  />
                                  <button 
                                      onClick={() => setShowKey(showKey === k.id ? null : k.id)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                                  >
                                      {showKey === k.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </button>
                              </div>
                              <Button variant="outline" size="icon" className="shrink-0 border-white/10 hover:bg-white/5">
                                  <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="shrink-0 border-white/10 hover:text-destructive hover:bg-destructive/10">
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </div>
                          <div className="text-xs text-muted-foreground flex justify-between border-t border-white/5 pt-3">
                              <span>Last used: {k.lastUsed}</span>
                              <span className="text-primary hover:underline cursor-pointer">View usage logs</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle className="h-5 w-5" />
                      <h2 className="font-semibold text-white">Security Notice</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                      Your API keys carry the same privileges as your user account. Do not share them or commit them to public repositories.
                  </p>
                  <Button variant="link" className="px-0 text-primary h-auto flex items-center gap-1">
                      Read security best practices <ExternalLink className="h-3 w-3" />
                  </Button>
              </div>

              <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <h2 className="font-semibold">Quick Example</h2>
                  <div className="bg-black/60 rounded-xl p-4 border border-white/5 overflow-x-auto">
                      <pre className="text-xs font-mono text-gray-300">
<span className="text-emerald-400">curl</span> -X POST https://api.universalwebtonative.com/v1/builds \<br/>
  -H <span className="text-yellow-300">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
  -H <span className="text-yellow-300">"Content-Type: application/json"</span> \<br/>
  -d <span className="text-cyan-300">'{'{"projectId": "proj_123", "platform": "android"}'}'</span>
                      </pre>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
