'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Search, Smartphone, Monitor, Trash2 } from 'lucide-react'

export default function DownloadsPage() {
  const [search, setSearch] = useState('')

  const downloads = [
    { id: 1, name: 'E-commerce App', platform: 'Android', version: '1.0.4', size: '24.5 MB', date: 'Just now', icon: Smartphone, status: 'Ready' },
    { id: 2, name: 'Blog App', platform: 'iOS', version: '2.1.0', size: '42.1 MB', date: '2 days ago', icon: Smartphone, status: 'Ready' },
    { id: 3, name: 'Admin Dashboard', platform: 'Desktop (Win)', version: '1.0.0', size: '115.3 MB', date: '1 week ago', icon: Monitor, status: 'Expired' },
    { id: 4, name: 'SaaS Platform', platform: 'Android', version: '3.4.1', size: '18.2 MB', date: '2 weeks ago', icon: Smartphone, status: 'Ready' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Downloads</h1>
          <p className="text-muted-foreground mt-1">
            Access and manage your generated application packages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-xl p-6 shadow-sm border-white/5">
          <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Total Downloads</p>
          <p className="text-3xl font-bold mt-2">124</p>
          <p className="text-xs text-emerald-500 mt-1 flex items-center">+12 this month</p>
        </div>
        <div className="glass-panel rounded-xl p-6 shadow-sm border-white/5">
          <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Storage Used</p>
          <p className="text-3xl font-bold mt-2">4.2 GB</p>
          <div className="w-full bg-background rounded-full h-1.5 mt-3">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '42%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">of 10 GB limit</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10">
        <div className="p-4 border-b border-white/5 bg-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search packages..." 
                className="pl-9 bg-background/50 border-white/10 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="border-white/10 bg-background/50 h-10 flex-1 sm:flex-none">All Platforms</Button>
                <Button variant="outline" className="border-white/10 bg-background/50 h-10 flex-1 sm:flex-none">Sort: Newest</Button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                    <tr>
                        <th className="px-6 py-4 font-semibold tracking-wider">Package Details</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Platform</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Size</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                        <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {downloads.map((item) => (
                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-base">{item.name}</div>
                                        <div className="text-xs text-muted-foreground mt-0.5">v{item.version}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-muted-foreground">{item.platform}</td>
                            <td className="px-6 py-4 font-mono text-xs">{item.size}</td>
                            <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                            <td className="px-6 py-4">
                                <Badge variant={item.status === 'Ready' ? 'default' : 'secondary'} className={item.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 border-0' : 'bg-white/10 text-muted-foreground border-0'}>
                                    {item.status}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white" disabled={item.status !== 'Ready'}>
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive">
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
    </div>
  )
}
