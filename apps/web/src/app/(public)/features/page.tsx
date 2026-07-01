'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Smartphone,
  Cpu,
  Layers,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Code,
  Bell,
  Camera,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FeaturesPage() {
  const nativeBridges = [
    { name: 'Camera & Biometrics', desc: 'Securely authenticate and request device cameras using web event hooks.', icon: Camera },
    { name: 'Geolocation Services', desc: 'Acquire precise coordinates using native location services directly in-app.', icon: Compass },
    { name: 'Push Notifications', desc: 'Leverage APNS and Firebase to push notifications directly to locked device screens.', icon: Bell },
  ]

  const compilationFlows = [
    { title: 'AI Crawler Scans Assets', desc: 'We scan your website structures, scripts, and responsive breakpoints to build an optimal container config.' },
    { title: 'Native Wrappers Built', desc: 'Our runner injects custom service workers and bridges, packing iOS, Android, and Desktop builds.' },
    { title: 'Store Upload Ready', desc: 'Outputs verified, sandboxed .ipa, .apk, and .exe files ready for immediate store submission.' },
  ]

  return (
    <div className="space-y-24 py-10">
      {/* Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          SaaS-Grade <span className="text-gradient-primary">Native Bridges</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Unlock native system APIs directly from your web environment with our custom bridge wrapper. No native code required.
        </p>
      </section>

      {/* Feature Grid Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge text="Capabilities" />
          <h2 className="text-3xl font-bold tracking-tight">Native Features Out of the Box</h2>
          <p className="text-muted-foreground leading-relaxed">
            All app builds include automatic device integration protocols. Inject our lightweight JS sdk to interface directly with core hardware APIs.
          </p>
          <div className="space-y-4">
            {nativeBridges.map((bridge, index) => (
              <div key={index} className="flex gap-4">
                <div className="p-2 bg-secondary/15 text-secondary rounded-lg h-fit">
                  <bridge.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white">{bridge.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{bridge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Visual Widget */}
        <div className="glass-panel border rounded-2xl p-8 space-y-6 relative overflow-hidden shadow-mint-glow">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-bold text-lg text-white">JavaScript Interface SDK</h3>
          <p className="text-xs text-muted-foreground">
            Copy and paste this snippet to trigger native camera access in your web application:
          </p>
          <pre className="p-4 rounded-lg bg-black/60 border border-white/5 text-xs text-secondary font-mono overflow-x-auto leading-relaxed">
{`// Access native device cameras
import { WebToNative } from '@uwtn/sdk';

async function captureProfile() {
  const photo = await WebToNative.camera.takePhoto({
    quality: 90,
    allowEditing: true
  });
  console.log('Saved local path:', photo.path);
}`}
          </pre>
          <div className="flex gap-2 items-center text-xs text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-secondary" />
            <span>Fully compatible with iOS, Android, and Desktop compilers.</span>
          </div>
        </div>
      </section>

      {/* Build Process Flow */}
      <section className="space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">The AI Compilation Pipeline</h2>
          <p className="text-sm text-muted-foreground">
            How we translate your responsive website URL into native mobile and desktop binary packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {compilationFlows.map((step, index) => (
            <div key={index} className="glass-panel rounded-xl p-8 border shadow-sm space-y-4 hover:border-primary/40 transition-colors duration-300 relative">
              <div className="absolute -top-4 -left-2 text-6xl font-extrabold text-white/5 select-none">
                0{index + 1}
              </div>
              <h3 className="text-lg font-bold text-white pt-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="glass-panel border rounded-2xl p-12 text-center space-y-6 relative overflow-hidden shadow-premium-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50" />
        <h2 className="text-3xl font-bold tracking-tight text-white relative z-10">
          Ready to Deploy Your Native Application?
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto relative z-10 leading-relaxed">
          Create a free project inside our dashboard. Scan your site structure, and get your iOS, Android, and Desktop builds within minutes.
        </p>
        <div className="relative z-10">
          <Link href="/register">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white font-semibold">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary tracking-wide uppercase">
      {text}
    </span>
  )
}
