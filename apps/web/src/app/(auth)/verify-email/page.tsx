'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, MailOpen, ArrowRight } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#030209] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel border rounded-2xl p-8 md:p-10 shadow-premium-glow text-center space-y-6 animate-in zoom-in-95 duration-300">
          {/* Logo Header */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 justify-center">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Universal</span>
            </Link>
            <div className="p-4 bg-secondary/15 rounded-full text-secondary w-fit mx-auto mt-4">
              <MailOpen className="h-10 w-10 animate-bounce" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Verify Your Email</h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We have sent a verification link to your email address. 
              Please click the link inside that email to activate your account.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-3">
            <Link href="/login" className="w-full block">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                Proceed to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-[10px] text-muted-foreground">
              Didn&apos;t receive any email? Check your spam folder or try registering again.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
