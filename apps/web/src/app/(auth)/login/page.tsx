'use client'

import React from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#030209] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
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
            <h1 className="text-2xl font-bold tracking-tight text-white mt-4">Welcome Back</h1>
            <p className="text-xs text-muted-foreground">
              Sign in to manage and build native application packages.
            </p>
          </div>

          {/* Social Sign-In */}
          <OAuthButtons />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#080615] px-3 text-muted-foreground font-semibold">
                Or Continue With Email
              </span>
            </div>
          </div>

          {/* Main Credentials Form */}
          <LoginForm />

          {/* Additional Helpers */}
          <div className="flex justify-between items-center text-xs pt-2">
            <Link href="/forgot-password" className="text-secondary hover:underline">
              Forgot password?
            </Link>
            <p className="text-muted-foreground">
              New here?{' '}
              <Link href="/register" className="text-secondary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
