'use client'

import { BookOpen, Terminal, Code, Settings } from 'lucide-react'

export default function DocsPage() {
  const categories = [
      {
          icon: BookOpen,
          title: 'Getting Started',
          desc: 'Quick start guide to convert your first web app.',
          links: ['Introduction to UWTN', 'System Requirements', 'Your First Build']
      },
      {
          icon: Settings,
          title: 'Configuration',
          desc: 'Learn how to configure app metadata and permissions.',
          links: ['Android Manifest Guide', 'iOS Info.plist Config', 'Desktop Window Settings']
      },
      {
          icon: Code,
          title: 'Native Bridge API',
          desc: 'Access native device features using Javascript.',
          links: ['Camera API', 'Push Notifications', 'Geolocation & GPS']
      },
      {
          icon: Terminal,
          title: 'CLI & Automation',
          desc: 'Integrate build steps into your CI/CD pipelines.',
          links: ['CLI Installation', 'GitHub Actions Setup', 'Automated App Store Deploy']
      }
  ]

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
              <p className="text-xl text-muted-foreground">Everything you need to build, configure, and deploy your native applications.</p>
          </div>

          <div className="relative">
              <input 
                  type="text" 
                  placeholder="Search documentation (e.g., 'Push Notifications')..." 
                  className="w-full h-14 bg-background/50 border border-white/20 rounded-xl px-6 text-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-premium-glow"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                  <div key={i} className="glass-panel p-8 rounded-2xl border-white/10 hover:border-white/20 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          <cat.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{cat.title}</h2>
                      <p className="text-muted-foreground mb-6">{cat.desc}</p>
                      
                      <ul className="space-y-3">
                          {cat.links.map((link, j) => (
                              <li key={j}>
                                  <a href="#" className="text-sm font-medium text-gray-300 hover:text-primary flex items-center gap-2 transition-colors">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                      {link}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>

      </div>
    </div>
  )
}
