'use client'

import { Badge } from '@/components/ui/badge'
import { ShieldCheck, ShieldAlert, Shield, AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export default function SecurityScanPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security Scan</h1>
        <p className="text-muted-foreground mt-1">Assess the security posture of the web application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 rounded-2xl border-white/10 flex flex-col items-center justify-center text-center shadow-premium-glow">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[8px] border-emerald-500/20 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <div className="absolute inset-0 rounded-full border-[8px] border-emerald-500 border-r-transparent border-b-transparent transform -rotate-45"></div>
                  <span className="text-4xl font-bold text-emerald-500">85</span>
              </div>
              <h2 className="text-xl font-bold">Security Score</h2>
              <p className="text-sm text-emerald-500 mt-1 font-medium flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Good Standing
              </p>
          </div>

          <div className="md:col-span-2 glass-panel p-6 rounded-2xl border-white/10">
              <h3 className="font-semibold mb-4 text-lg">Vulnerability Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                  <div className="bg-background/50 rounded-xl border border-red-500/20 p-4 flex flex-col justify-center items-center">
                      <span className="text-3xl font-bold text-red-500">0</span>
                      <span className="text-xs text-muted-foreground uppercase mt-1">Critical</span>
                  </div>
                  <div className="bg-background/50 rounded-xl border border-orange-500/20 p-4 flex flex-col justify-center items-center">
                      <span className="text-3xl font-bold text-orange-500">1</span>
                      <span className="text-xs text-muted-foreground uppercase mt-1">High</span>
                  </div>
                  <div className="bg-background/50 rounded-xl border border-yellow-500/20 p-4 flex flex-col justify-center items-center">
                      <span className="text-3xl font-bold text-yellow-500">3</span>
                      <span className="text-xs text-muted-foreground uppercase mt-1">Medium</span>
                  </div>
                  <div className="bg-background/50 rounded-xl border border-blue-500/20 p-4 flex flex-col justify-center items-center">
                      <span className="text-3xl font-bold text-blue-500">12</span>
                      <span className="text-xs text-muted-foreground uppercase mt-1">Low</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-white/10 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Shield className="h-6 w-6 text-primary" /> Configuration Checks</h2>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <div>
                          <p className="font-semibold">HTTPS Enforcement</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Strict-Transport-Security header is present.</p>
                      </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0">Pass</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                          <p className="font-semibold">Content Security Policy (CSP)</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Missing robust CSP header for XSS protection.</p>
                      </div>
                  </div>
                  <Badge variant="outline" className="text-orange-500 border-orange-500/50">High Priority</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <div>
                          <p className="font-semibold">Cross-Origin Resource Sharing (CORS)</p>
                          <p className="text-xs text-muted-foreground mt-0.5">CORS policy is restrictive and secure.</p>
                      </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0">Pass</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 text-blue-500" />
                      <div>
                          <p className="font-semibold">X-Frame-Options</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Set to SAMEORIGIN. Prevents clickjacking.</p>
                      </div>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-500 border-0">Notice</Badge>
              </div>
          </div>
      </div>
    </div>
  )
}
