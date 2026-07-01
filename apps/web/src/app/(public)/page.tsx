'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  CheckCircle,
  Play,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from 'lucide-react'

export default function LandingPage() {
  const [demoUrl, setDemoUrl] = useState('')
  const [simulatedPlatform, setSimulatedPlatform] = useState<'ios' | 'android'>('ios')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationStep, setSimulationStep] = useState(0)

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!demoUrl) return
    setIsSimulating(true)
    setSimulationStep(1)
    setTimeout(() => setSimulationStep(2), 1500)
    setTimeout(() => setSimulationStep(3), 3000)
  }

  return (
    <div className="space-y-24 py-10 overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center py-20 lg:py-32 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-secondary font-medium tracking-wide shadow-premium-glow"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>Universal Web-to-Native V2 is Live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight"
        >
          Convert Any Website into{' '}
          <span className="text-gradient-primary">Native Apps</span> In Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          Automatically bundle your web application into high-performance, App Store-compliant
          iOS, Android, and Desktop builds using our AI compilation engines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white shadow-premium-glow px-8 py-6 text-base">
              Start Building Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-base border-white/10 hover:bg-white/5">
              Book live demo
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Interactive Simulator / Preview Widget */}
      <section className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-2xl border p-8 md:p-12 shadow-premium-glow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Input Side */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Try the AI App Simulator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter your website URL to simulate how our engine scans structures, 
                detects components, and initializes wrappers.
              </p>
              <form onSubmit={handleSimulate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSimulatedPlatform('ios')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      simulatedPlatform === 'ios'
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-white/5 hover:bg-white/5 text-muted-foreground'
                    }`}
                  >
                    iOS Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimulatedPlatform('android')}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      simulatedPlatform === 'android'
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-white/5 hover:bg-white/5 text-muted-foreground'
                    }`}
                  >
                    Android Device
                  </button>
                </div>
                <Button type="submit" disabled={isSimulating} className="w-full bg-secondary text-secondary-foreground font-semibold hover:opacity-90">
                  {isSimulating ? 'Analyzing Site...' : 'Simulate App Bundle'}
                </Button>
              </form>

              {/* Progress Steps */}
              {isSimulating && (
                <div className="space-y-2 pt-4 border-t border-white/5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-3 text-xs">
                    <div className={`h-2 w-2 rounded-full ${simulationStep >= 1 ? 'bg-secondary animate-ping' : 'bg-muted'}`} />
                    <span className={simulationStep >= 1 ? 'text-white' : 'text-muted-foreground'}>Scanning routing and assets...</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className={`h-2 w-2 rounded-full ${simulationStep >= 2 ? 'bg-secondary animate-ping' : 'bg-muted'}`} />
                    <span className={simulationStep >= 2 ? 'text-white' : 'text-muted-foreground'}>Optimizing client views...</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className={`h-2 w-2 rounded-full ${simulationStep >= 3 ? 'bg-secondary' : 'bg-muted'}`} />
                    <span className={simulationStep >= 3 ? 'text-white' : 'text-muted-foreground'}>Compilation ready!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Device Shell View */}
            <div className="flex justify-center">
              <div className="relative w-[280px] h-[560px] bg-black rounded-[40px] border-[8px] border-white/10 shadow-2xl flex flex-col overflow-hidden">
                {/* Speaker/Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="h-1 w-10 bg-white/20 rounded-full" />
                </div>

                {/* Simulated Screen */}
                <div className="flex-1 bg-[#090812] flex flex-col items-center justify-center p-6 text-center relative">
                  {simulationStep === 3 ? (
                    <div className="space-y-4 animate-in zoom-in-95 duration-300">
                      <div className="p-3 bg-secondary/15 rounded-full text-secondary w-fit mx-auto">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-lg text-white">App Simulated</h3>
                      <p className="text-xs text-muted-foreground">
                        Your website has been successfully simulated in a native wrapper container.
                      </p>
                      <Link href="/register">
                        <Button size="sm" className="mt-2 bg-gradient-to-r from-primary to-secondary text-white">
                          Download Package
                        </Button>
                      </Link>
                    </div>
                  ) : simulationStep > 0 ? (
                    <div className="space-y-4">
                      <div className="h-10 w-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs text-muted-foreground">
                        Analyzing elements for {demoUrl.replace('https://', '')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Smartphone className="h-12 w-12 text-white/20 mx-auto" />
                      <p className="text-xs text-muted-foreground">
                        Enter your web URL and click &quot;Simulate&quot; to preview your native application build.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Full Native Performance</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Get store-compliant applications with zero layout shifting, optimized image delivery, and deep security protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel rounded-xl p-8 border shadow-sm space-y-4 hover:border-primary/40 transition-colors duration-300">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Compiler Pipeline</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We leverage cloud-hosted compilers (including automated Xcode and Android SDK pipelines) to package app bundles quickly.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-8 border shadow-sm space-y-4 hover:border-secondary/40 transition-colors duration-300">
            <div className="p-3 bg-secondary/10 text-secondary rounded-lg w-fit">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">PWA Offline Caching</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Inject custom offline fallback views and local cache routines to guarantee application load speeds even during connectivity loss.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-8 border shadow-sm space-y-4 hover:border-primary/40 transition-colors duration-300">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">App Store Compliance</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pre-scanned elements ensure build wrappers meet Apple and Google developer terms, facilitating quick app store approvals.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
