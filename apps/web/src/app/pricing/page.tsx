'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const plans = [
      {
          name: 'Hobby',
          price: '$0',
          desc: 'Perfect for personal projects and prototypes.',
          features: [
              '1 Project App',
              'Basic Web-to-App Conversion',
              'Standard Build Speed',
              'Community Support',
              'Watermarked Splash Screen'
          ],
          buttonText: 'Start for Free',
          popular: false
      },
      {
          name: 'Pro',
          price: '$49',
          period: '/mo',
          desc: 'For professional developers and growing startups.',
          features: [
              '5 Project Apps',
              'Advanced AI UI/API Analysis',
              'Priority Build Queue',
              'No Watermarks',
              'Push Notifications Integration',
              'Email Support'
          ],
          buttonText: 'Start 14-Day Trial',
          popular: true
      },
      {
          name: 'Enterprise',
          price: '$199',
          period: '/mo',
          desc: 'For large teams requiring scale and security.',
          features: [
              'Unlimited Projects',
              'Custom Native Modules (React Native/Swift)',
              'Dedicated Build Workers (Zero wait)',
              'White-labeling & Custom Domains',
              'SLA Guarantee',
              '24/7 Dedicated Phone Support'
          ],
          buttonText: 'Contact Sales',
          popular: false
      }
  ]

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Simple, transparent pricing</h1>
              <p className="text-xl text-muted-foreground">Choose the plan that fits your needs. No hidden fees, ever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                  <div key={i} className={`relative glass-panel rounded-3xl p-8 flex flex-col ${plan.popular ? 'border-primary shadow-[0_0_40px_rgba(99,102,241,0.15)] bg-white/5' : 'border-white/10'}`}>
                      {plan.popular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                              Most Popular
                          </div>
                      )}
                      
                      <div className="mb-6">
                          <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                          <p className="text-muted-foreground text-sm h-10">{plan.desc}</p>
                      </div>
                      
                      <div className="mb-8">
                          <span className="text-5xl font-extrabold">{plan.price}</span>
                          {plan.period && <span className="text-lg text-muted-foreground font-medium">{plan.period}</span>}
                      </div>
                      
                      <div className="flex-1 space-y-4 mb-8">
                          {plan.features.map((feat, j) => (
                              <div key={j} className="flex items-start gap-3">
                                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="text-gray-300 text-sm">{feat}</span>
                              </div>
                          ))}
                      </div>
                      
                      <Button className={`w-full ${plan.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`} size="lg">
                          {plan.buttonText}
                      </Button>
                  </div>
              ))}
          </div>

          <div className="max-w-3xl mx-auto text-center p-8 glass-panel rounded-2xl border-white/10 bg-black/20">
              <h3 className="text-2xl font-bold mb-3">Need something custom?</h3>
              <p className="text-muted-foreground mb-6">Are you an agency building apps for multiple clients? Contact us for volume pricing and agency partnerships.</p>
              <Button variant="outline" className="border-white/20">Contact Partnership Team</Button>
          </div>
      </div>
    </div>
  )
}
