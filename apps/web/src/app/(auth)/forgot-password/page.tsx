'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Sparkles, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error

      setSuccess(true)
      toast({
        title: 'Reset Email Sent',
        description: 'Check your email inbox for instructions to update your password.',
      })
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to send password reset request.',
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

      {/* Back to Login */}
      <Link href="/login" className="absolute top-8 left-8 flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Login</span>
      </Link>

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
            <h1 className="text-2xl font-bold tracking-tight text-white mt-4">Reset Password</h1>
            <p className="text-xs text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {success ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-3 bg-secondary/15 rounded-full text-secondary w-fit mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Check Your Email</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We have emailed password reset instructions to <strong>{email}</strong>.
              </p>
              <Button onClick={() => setSuccess(false)} variant="outline" className="w-full border-white/10 hover:bg-white/5 mt-2">
                Resend email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
