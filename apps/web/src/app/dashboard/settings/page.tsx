'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Settings, Lock, Sparkles, Key } from 'lucide-react'

export default function SettingsPage() {
  const [name, setName] = useState('Muhammad Arslan')
  const [email, setEmail] = useState('muhammadarslan@example.com')
  const [apiKey, setApiKey] = useState('uwtn_live_948f92j8d82j3j283d')
  const [isRevealed, setIsRevealed] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Profile Updated',
      description: 'Your profile changes have been saved successfully.',
    })
  }

  const handleGenerateKey = () => {
    const newKey = 'uwtn_live_' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    setApiKey(newKey)
    toast({
      title: 'API Key Generated',
      description: 'A new integration key has been generated successfully.',
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure profile settings, manage API tokens, and adjust security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Profile & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3">
              <Settings className="h-5 w-5 text-primary" />
              General Profile Info
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email Address</Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </div>

          {/* Password Section */}
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3">
              <Lock className="h-5 w-5 text-primary" />
              Change Password
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); toast({ title: 'Password Changed' }) }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="old-pass">Current Password</Label>
                  <Input id="old-pass" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input id="new-pass" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass">Confirm Password</Label>
                  <Input id="confirm-pass" type="password" required />
                </div>
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </div>
        </div>

        {/* Right Column: API Keys */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              API Developer Tokens
            </h2>
            <p className="text-xs text-muted-foreground">
              Integrate the Web to Native compiler workflow directly into your CI/CD pipelines.
            </p>
            <div className="space-y-2">
              <Label>Current API Key</Label>
              <div className="flex gap-2">
                <Input
                  value={isRevealed ? apiKey : '••••••••••••••••••••••••••••••••'}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button size="sm" variant="outline" onClick={() => setIsRevealed(!isRevealed)}>
                  {isRevealed ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGenerateKey}>
              Regenerate Token
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
