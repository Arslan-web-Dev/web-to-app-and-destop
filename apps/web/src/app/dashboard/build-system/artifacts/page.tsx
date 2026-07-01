'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Trash2, Package, Filter, Apple, Monitor, Smartphone, HardDrive } from 'lucide-react'

export default function BuildArtifactsPage() {
  const artifacts = [
      { id: 'art_1a', name: 'MyAwesomeApp_1.0.4.aab', project: 'Social Network', platform: 'Android', size: '14.2 MB', created: '2 mins ago', expires: 'In 30 days' },
      { id: 'art_1b', name: 'MyAwesomeApp_1.0.4.apk', project: 'Social Network', platform: 'Android', size: '28.4 MB', created: '2 mins ago', expires: 'In 30 days' },
      { id: 'art_2', name: 'CryptoWallet_Release.ipa', project: 'Crypto Wallet', platform: 'iOS', size: '22.1 MB', created: '2 hours ago', expires: 'In 29 days' },
      { id: 'art_3', name: 'POS_System_x64.msi', project: 'Restaurant POS', platform: 'Windows', size: '64.5 MB', created: 'Yesterday', expires: 'In 28 days' },
      { id: 'art_4', name: 'POS_System_arm64.dmg', project: 'Restaurant POS', platform: 'macOS', size: '58.2 MB', created: 'Yesterday', expires: 'In 28 days' },
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artifacts Storage</h1>
          <p className="text-muted-foreground mt-1">Manage generated build packages and retention policies.</p>
        </div>
        <div className="flex gap-2 text-sm">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                <HardDrive className="h-4 w-4 text-primary" />
                <span><span className="text-white font-bold">187.4 MB</span> used of 5 GB</span>
            </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4">
              <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search artifacts..." className="pl-9 bg-background/50 border-white/10" />
              </div>
              <Button variant="outline" className="border-white/10 bg-background/50">
                  <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
          </div>
          <div className="flex gap-2">
              <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold w-12">
                          <input type="checkbox" className="accent-primary" />
                      </th>
                      <th className="px-6 py-4 font-semibold">Artifact Name</th>
                      <th className="px-6 py-4 font-semibold">Platform</th>
                      <th className="px-6 py-4 font-semibold">Size</th>
                      <th className="px-6 py-4 font-semibold">Created</th>
                      <th className="px-6 py-4 font-semibold">Expires</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {artifacts.map((art) => (
                      <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                              <input type="checkbox" className="accent-primary" />
                          </td>
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                      <div className="font-mono text-white text-xs">{art.name}</div>
                                      <div className="text-xs text-muted-foreground">{art.project}</div>
                                  </div>
                              </div>
                          </td>
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-gray-300">
                                  {art.platform === 'Android' && <Smartphone className="h-4 w-4 text-emerald-500" />}
                                  {art.platform === 'iOS' && <Apple className="h-4 w-4 text-blue-500" />}
                                  {art.platform === 'Windows' && <Monitor className="h-4 w-4 text-cyan-500" />}
                                  {art.platform === 'macOS' && <Apple className="h-4 w-4 text-indigo-500" />}
                                  {art.platform}
                              </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-400">
                              {art.size}
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-xs">
                              {art.created}
                          </td>
                          <td className="px-6 py-4 text-yellow-500/70 text-xs font-mono">
                              {art.expires}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10">
                                      <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                      <Trash2 className="h-4 w-4" />
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
