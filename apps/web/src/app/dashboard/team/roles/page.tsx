'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Plus, Check } from 'lucide-react'

export default function TeamRolesPage() {
  const roles = [
      {
          name: 'Owner',
          desc: 'Full access to all resources, billing, and team management.',
          permissions: ['Manage Billing', 'Manage Team', 'Manage API Keys', 'Trigger Builds', 'Download Artifacts', 'Delete Projects'],
          members: 1,
          custom: false
      },
      {
          name: 'Admin',
          desc: 'Can manage team and projects, but cannot access billing.',
          permissions: ['Manage Team', 'Manage API Keys', 'Trigger Builds', 'Download Artifacts', 'Delete Projects'],
          members: 1,
          custom: false
      },
      {
          name: 'Developer',
          desc: 'Can create projects, trigger builds, and view logs.',
          permissions: ['Create Projects', 'Trigger Builds', 'Download Artifacts', 'View Logs'],
          members: 1,
          custom: false
      },
      {
          name: 'Viewer',
          desc: 'Read-only access to projects and artifacts.',
          permissions: ['View Projects', 'Download Artifacts'],
          members: 1,
          custom: false
      }
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground mt-1">Define what your team members can and cannot do.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> Create Custom Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {roles.map((role) => (
              <div key={role.name} className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white/5 rounded-lg">
                          <Shield className={`h-5 w-5 ${role.name === 'Owner' ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      <Badge variant="outline" className="bg-background/50 border-white/10">{role.members} User{role.members !== 1 ? 's' : ''}</Badge>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">{role.name}</h2>
                  <p className="text-sm text-muted-foreground mb-6 h-10">{role.desc}</p>
                  
                  <div className="space-y-3 flex-1">
                      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Permissions</h3>
                      {role.permissions.map((perm) => (
                          <div key={perm} className="flex items-center gap-2 text-sm text-gray-300">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                              {perm}
                          </div>
                      ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6 border-white/10 bg-background/50 hover:bg-white/5" disabled={!role.custom}>
                      {role.custom ? 'Edit Role' : 'System Role (Read-only)'}
                  </Button>
              </div>
          ))}
      </div>
    </div>
  )
}
