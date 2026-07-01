'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Users, UserPlus, Mail, ShieldAlert, Check } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Member {
  id: string
  name: string
  email: string
  role: 'Owner' | 'Admin' | 'Developer'
  status: 'Active' | 'Pending'
}

export default function TeamPage() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'Admin' | 'Developer'>('Developer')
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Muhammad Arslan', email: 'muhammadarslan@example.com', role: 'Owner', status: 'Active' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '3', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Developer', status: 'Pending' },
  ])

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const newMember: Member = {
      id: Math.random().toString(),
      name: email.split('@')[0],
      email,
      role,
      status: 'Pending',
    }

    setMembers([...members, newMember])
    setEmail('')
    toast({
      title: 'Invite Sent',
      description: `Invitation successfully sent to ${email}`,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage team members, roles, and collaborative workspace access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Members List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg bg-card shadow-sm divide-y">
            {members.map((member) => (
              <div key={member.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center font-bold text-sm">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{member.role}</Badge>
                  <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Invite Member */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite Member
            </h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-role">Role</Label>
                <select
                  id="invite-role"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                Send Invitation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
