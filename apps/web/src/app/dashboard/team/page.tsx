'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, MoreVertical, ShieldAlert, Mail } from 'lucide-react'

export default function TeamMembersPage() {
  const members = [
      { id: 'usr_1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Owner', status: 'Active', avatar: 'AJ' },
      { id: 'usr_2', name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', status: 'Active', avatar: 'BS' },
      { id: 'usr_3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Developer', status: 'Invited', avatar: 'CD' },
      { id: 'usr_4', name: 'Diana Evans', email: 'diana@example.com', role: 'Viewer', status: 'Active', avatar: 'DE' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage who has access to your workspace and projects.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> Invite Member
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9 bg-background/50 border-white/10" />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <span>Seats Used: <span className="text-white font-medium">4</span> / 10</span>
          </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {members.map((member) => (
                      <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                                      {member.avatar}
                                  </div>
                                  <div>
                                      <div className="font-medium text-white">{member.name}</div>
                                      <div className="text-xs text-muted-foreground">{member.email}</div>
                                  </div>
                              </div>
                          </td>
                          <td className="px-6 py-4">
                              <Badge variant="outline" className={`border-white/10 ${member.role === 'Owner' ? 'text-primary' : 'text-gray-300'}`}>{member.role}</Badge>
                          </td>
                          <td className="px-6 py-4">
                              {member.status === 'Active' ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0">Active</Badge>
                              ) : (
                                  <Badge className="bg-yellow-500/10 text-yellow-500 border-0 flex w-fit items-center gap-1"><Mail className="h-3 w-3" /> Invited</Badge>
                              )}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                  {member.role !== 'Owner' && (
                                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                                          <MoreVertical className="h-4 w-4" />
                                      </Button>
                                  )}
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-white/10 bg-black/20 flex gap-4">
          <ShieldAlert className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
              <h3 className="font-semibold text-sm">Security Policy Note</h3>
              <p className="text-xs text-muted-foreground mt-1">
                  Team members with the "Admin" or "Developer" roles can trigger new builds and consume build minutes. "Viewer" roles can only download existing artifacts.
              </p>
          </div>
      </div>
    </div>
  )
}
