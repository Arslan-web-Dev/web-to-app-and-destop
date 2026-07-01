'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Sparkles, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || password !== confirmPassword) {
      toast({
        title: 'Validation Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabaseClient.auth.updateUser({
        password: password,
      })
      if (error) throw error

      toast({
        title: 'Password Updated',
        description: 'Your account password has been updated successfully.',
      })
      router.push('/dashboard')
    } catch (err: any) {
      toast({
        title: 'Update Failed',
        description: err.message || 'An error occurred while updating your password.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030209] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel border rounded-2xl p-8 md:p-10 shadow-premium-glow space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 justify-center">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Universal</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-4">New Password</h1>
            <p className="text-xs text-muted-foreground">
              Please enter your new secure password.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
              <KeyRound className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
