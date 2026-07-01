'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, CheckCircle2, Wrench, Users, CreditCard, AlertTriangle } from 'lucide-react'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')

  const notifications = [
    { id: 1, type: 'build', title: 'Build Successful', desc: 'Android build for "E-commerce App" v1.0.4 completed.', time: '10 mins ago', read: false, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 2, type: 'system', title: 'System Maintenance', desc: 'Scheduled maintenance in 24 hours. Builds may be delayed.', time: '2 hours ago', read: false, icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 3, type: 'team', title: 'New Team Member', desc: 'Sarah joined your workspace as a Developer.', time: 'Yesterday', read: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 4, type: 'build', title: 'Build Failed', desc: 'iOS build for "Blog App" failed during signing.', time: 'Yesterday', read: true, icon: Wrench, color: 'text-destructive', bg: 'bg-destructive/10' },
    { id: 5, type: 'billing', title: 'Invoice Paid', desc: 'Your monthly Pro Plan invoice has been paid successfully.', time: '3 days ago', read: true, icon: CreditCard, color: 'text-primary', bg: 'bg-primary/10' },
  ]

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter)

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated on your builds, team activity, and billing.
          </p>
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark all as read
        </Button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden shadow-premium-glow">
          <div className="p-4 border-b border-white/5 bg-white/5">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="bg-background/50 border border-white/5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="build">Builds</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
              </Tabs>
          </div>

          <div className="divide-y divide-white/5">
              {filtered.map((notification) => (
                  <div key={notification.id} className={`p-6 flex gap-4 transition-colors hover:bg-white/[0.02] ${!notification.read ? 'bg-primary/[0.02]' : ''}`}>
                      <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.bg} ${notification.color}`}>
                          <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-4">
                              <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-muted-foreground'}`}>{notification.title}</h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{notification.desc}</p>
                      </div>
                      {!notification.read && (
                          <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-primary glow-indigo"></div>
                          </div>
                      )}
                  </div>
              ))}
              
              {filtered.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground">
                      <Bell className="mx-auto h-12 w-12 mb-4 opacity-20" />
                      <p>No notifications found in this category.</p>
                  </div>
              )}
          </div>
      </div>
    </div>
  )
}
