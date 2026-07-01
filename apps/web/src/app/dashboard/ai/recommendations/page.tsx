'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lightbulb, Zap, Shield, Search, Accessibility, CheckCircle2, ArrowRight } from 'lucide-react'

export default function RecommendationsPage() {
  const recommendations = [
    {
        id: 1,
        title: "Enable Offline Caching for Products API",
        category: "Performance",
        icon: Zap,
        color: "text-yellow-500",
        impact: "High",
        effort: "Medium",
        desc: "Native apps expect robust offline capabilities. We recommend configuring a local SQLite cache for your /api/v1/products endpoint to improve load times and allow offline browsing.",
        autofix: true
    },
    {
        id: 2,
        title: "Implement Strict Content Security Policy",
        category: "Security",
        icon: Shield,
        color: "text-red-500",
        impact: "High",
        effort: "Low",
        desc: "Your web app lacks a strict CSP. Before converting to native webviews, injecting a CSP header will prevent potential XSS attacks within the app container.",
        autofix: true
    },
    {
        id: 3,
        title: "Increase Contrast on Muted Text",
        category: "Accessibility",
        icon: Accessibility,
        color: "text-indigo-500",
        impact: "Medium",
        effort: "Low",
        desc: "Several text elements (like 'Read more' links) fail WCAG 2.1 AA contrast requirements. We can automatically darken the text color to #4B5563.",
        autofix: true
    },
    {
        id: 4,
        title: "Add Missing Alt Attributes to Images",
        category: "SEO",
        icon: Search,
        color: "text-blue-500",
        impact: "Medium",
        effort: "Low",
        desc: "2 decorative images are missing alt attributes. AI can automatically generate descriptions based on image content.",
        autofix: true
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">Actionable insights to prepare your website for native conversion.</p>
        </div>
        <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold">92% Native Ready</span>
            </div>
        </div>
      </div>

      <div className="space-y-6">
          {recommendations.map((rec) => (
              <div key={rec.id} className="glass-panel p-6 rounded-2xl border-white/10 hover:border-primary/30 transition-colors shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-white/5 ${rec.color}`}>
                                  <rec.icon className="h-5 w-5" />
                              </div>
                              <h2 className="text-xl font-semibold">{rec.title}</h2>
                          </div>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                              {rec.desc}
                          </p>

                          <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="border-white/10">{rec.category}</Badge>
                              <Badge variant="secondary" className={rec.impact === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}>Impact: {rec.impact}</Badge>
                              <Badge variant="secondary" className="bg-white/5 text-gray-300">Effort: {rec.effort}</Badge>
                              {rec.autofix && (
                                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-0 flex items-center gap-1">
                                      <Lightbulb className="h-3 w-3" /> Auto-Fix Available
                                  </Badge>
                              )}
                          </div>
                      </div>
                      
                      <div className="flex items-center md:items-end justify-start md:justify-end shrink-0">
                          <Button className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-premium-glow">
                              Apply Fix <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  )
}
