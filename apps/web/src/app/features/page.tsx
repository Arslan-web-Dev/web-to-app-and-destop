'use client'

import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Shield, Smartphone, Monitor, Code } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
      {
          icon: Sparkles,
          title: 'AI-Powered Analysis',
          description: 'Our proprietary AI engine automatically detects your website framework, UI components, and API layer to generate a perfectly optimized native shell.',
          color: 'text-purple-500',
          bg: 'bg-purple-500/10'
      },
      {
          icon: Smartphone,
          title: 'Native Mobile Performance',
          description: 'Get near-native performance on iOS and Android with optimized WebViews, advanced caching, and seamless JavaScript bridge capabilities.',
          color: 'text-emerald-500',
          bg: 'bg-emerald-500/10'
      },
      {
          icon: Monitor,
          title: 'Cross-Platform Desktop',
          description: 'Package your web app for Windows, macOS, and Linux simultaneously. Complete with system tray support, notifications, and auto-updates.',
          color: 'text-blue-500',
          bg: 'bg-blue-500/10'
      },
      {
          icon: Shield,
          title: 'Enterprise-Grade Security',
          description: 'Built-in SSL pinning, encrypted local storage, biometric authentication hooks, and strict Content Security Policies out of the box.',
          color: 'text-red-500',
          bg: 'bg-red-500/10'
      },
      {
          icon: Zap,
          title: 'Offline Capabilities',
          description: 'Intelligently cache your static assets and queue API requests when network connectivity drops, syncing automatically when back online.',
          color: 'text-yellow-500',
          bg: 'bg-yellow-500/10'
      },
      {
          icon: Code,
          title: 'Developer Friendly',
          description: 'Extensive SDKs and plugins allow you to easily tap into native device features like Camera, GPS, Push Notifications, and Bluetooth.',
          color: 'text-cyan-500',
          bg: 'bg-cyan-500/10'
      }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 md:py-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0 z-0"></div>
              <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                  <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1.5 text-sm rounded-full">
                      Everything you need
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                      Powerful features for <br className="hidden md:block" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">modern applications</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                      Transform your website into a fully-fledged native app with features that rival hand-coded mobile and desktop applications.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-200">Start Free Trial</Button>
                      <Button size="lg" variant="outline" className="border-white/20">View Documentation</Button>
                  </div>
              </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-black/20">
              <div className="container mx-auto px-4 max-w-6xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {features.map((feature, idx) => (
                          <div key={idx} className="glass-panel p-8 rounded-2xl border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-premium-glow group">
                              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                              </div>
                              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                              <p className="text-muted-foreground leading-relaxed">
                                  {feature.description}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          {/* CTA Section */}
          <section className="py-24">
              <div className="container mx-auto px-4 text-center max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to go native?</h2>
                  <p className="text-lg text-muted-foreground mb-8">Join thousands of developers who are shipping cross-platform apps in record time.</p>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg">
                      Create Your First App <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
              </div>
          </section>
      </main>
    </div>
  )
}

function Badge({ children, className, ...props }: any) {
    return <span className={`inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>{children}</span>
}
