'use client'

import { Badge } from '@/components/ui/badge'
import { Activity, Webhook, Network, ArrowRightLeft, Search } from 'lucide-react'

export default function ApiDetectionPage() {
  const endpoints = [
    { method: 'GET', url: '/api/v1/users/me', auth: 'Bearer', status: '200 OK' },
    { method: 'POST', url: '/api/v1/auth/login', auth: 'None', status: '200 OK' },
    { method: 'GET', url: '/api/v1/products', auth: 'None', status: '200 OK' },
    { method: 'POST', url: '/api/v1/orders', auth: 'Bearer', status: '201 Created' },
    { method: 'PUT', url: '/api/v1/users/settings', auth: 'Bearer', status: '200 OK' },
    { method: 'DELETE', url: '/api/v1/items/:id', auth: 'Bearer', status: '204 No Content' },
  ]

  const methodColors: Record<string, string> = {
      GET: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      POST: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      PUT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      DELETE: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Detection</h1>
        <p className="text-muted-foreground mt-1">Discover background requests and map the application's data layer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5 lg:col-span-1">
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Total Endpoints</p>
              <div className="flex items-end gap-3 mt-2">
                  <p className="text-4xl font-bold text-gradient-primary">24</p>
                  <p className="text-sm text-emerald-500 mb-1">Detected</p>
              </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl shadow-sm border-white/5 lg:col-span-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Network className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                      <h3 className="font-semibold text-lg">REST API Architecture</h3>
                      <p className="text-sm text-muted-foreground">JSON responses with Bearer Token authentication.</p>
                  </div>
              </div>
              <Badge variant="outline" className="text-primary border-primary">Ready for Native Binding</Badge>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
              <Webhook className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold">Discovered Endpoints</h2>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                      <tr>
                          <th className="px-6 py-4 font-semibold">Method</th>
                          <th className="px-6 py-4 font-semibold">Endpoint URL</th>
                          <th className="px-6 py-4 font-semibold">Auth Required</th>
                          <th className="px-6 py-4 font-semibold text-right">Last Status</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {endpoints.map((ep, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4">
                                  <Badge variant="outline" className={`font-mono text-xs w-16 justify-center ${methodColors[ep.method]}`}>
                                      {ep.method}
                                  </Badge>
                              </td>
                              <td className="px-6 py-4 font-mono text-gray-300">{ep.url}</td>
                              <td className="px-6 py-4">
                                  {ep.auth === 'None' ? (
                                      <span className="text-muted-foreground">Public</span>
                                  ) : (
                                      <Badge variant="secondary" className="bg-white/10">{ep.auth}</Badge>
                                  )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <span className="text-emerald-500 font-mono text-xs">{ep.status}</span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><ArrowRightLeft className="h-5 w-5 text-muted-foreground" /> Payload Sample (Response)</h3>
              <div className="bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-xs overflow-x-auto text-gray-300">
                  <pre>{`{
  "status": "success",
  "data": {
    "user": {
      "id": "usr_12345",
      "email": "user@example.com",
      "role": "admin",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  }
}`}</pre>
              </div>
          </div>
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Search className="h-5 w-5 text-muted-foreground" /> Offline Capability Assessment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                  The API uses standard REST conventions. To enable offline mode in the native apps, we recommend caching `GET /api/v1/products` and queueing `POST /api/v1/orders` using local SQLite/Room database when network is unavailable.
              </p>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 mt-4">
                  <p className="text-sm font-medium text-primary">Recommendation: Enable Offline Queueing in Native Settings.</p>
              </div>
          </div>
      </div>
    </div>
  )
}
