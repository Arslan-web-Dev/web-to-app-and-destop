'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Terminal, Code, Cpu, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface DocSection {
  title: string
  description: string
  icon: any
  links: { label: string; href: string }[]
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const sections: DocSection[] = [
    {
      title: 'Getting Started',
      description: 'Learn the core concepts and compile your first native app container within 5 minutes.',
      icon: BookOpen,
      links: [
        { label: 'Introduction to Web-to-Native', href: '#intro' },
        { label: 'System Prerequisites', href: '#prerequisites' },
        { label: 'Basic App Configuration', href: '#config' },
      ],
    },
    {
      title: 'API Reference',
      description: 'Integrate device camera, geolocation, biometric login, and push token hooks.',
      icon: Code,
      links: [
        { label: 'JavaScript Interface SDK', href: '#sdk' },
        { label: 'Native Event Bindings', href: '#events' },
        { label: 'Push Notification Headers', href: '#push' },
      ],
    },
    {
      title: 'User Guide & Compliance',
      description: 'Check assets specifications, splash screen sizes, and app store compliance standards.',
      icon: Cpu,
      links: [
        { label: 'iOS App Store Guidelines', href: '#ios' },
        { label: 'Google Play Release Checklist', href: '#android' },
        { label: 'Performance Optimization Tips', href: '#performance' },
      ],
    },
  ]

  const filteredSections = sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-16 py-10">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Documentation Portal</h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Everything you need to compile, configure, and publish your web apps to native stores.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides, SDK references..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-white/10 bg-white/5 focus:ring-secondary"
          />
        </div>
      </section>

      {/* Grid of Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredSections.map((section, index) => (
          <div key={index} className="glass-panel border rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors duration-300">
            <div className="space-y-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.description}</p>
              
              <ul className="space-y-2 pt-4 border-t border-white/5">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-xs text-muted-foreground hover:text-secondary flex items-center gap-1.5 transition-colors">
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6">
              <Button size="sm" variant="outline" className="w-full border-white/10 hover:bg-white/5 text-xs">
                Explore Section
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Install Code Block */}
      <section className="max-w-3xl mx-auto glass-panel border rounded-2xl p-8 space-y-4 shadow-premium-glow">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-secondary" />
          <h3 className="font-bold text-white text-base">Quick CLI Installation</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Download our compiler CLI helper directly from npm to trigger local builds:
        </p>
        <pre className="p-4 rounded-lg bg-black/60 border border-white/5 text-xs text-secondary font-mono overflow-x-auto leading-relaxed">
{`# Install CLI helper globally
npm install -g @uwtn/cli

# Run setup scans on your website project folder
uwtn init`}
        </pre>
      </section>
    </div>
  )
}
