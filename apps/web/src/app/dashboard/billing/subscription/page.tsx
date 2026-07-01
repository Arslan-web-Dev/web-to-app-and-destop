'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Zap, Sparkles, CreditCard, Box } from 'lucide-react'

export default function SubscriptionPage() {
  const currentPlan = "Pro"
  
  const plans = [
      {
          name: 'Free',
          price: '$0',
          period: '/month',
          features: ['1 Project', 'Basic Web to App conversion', 'Community Support', 'Shared Build Queue'],
          buttonText: 'Current Plan',
          variant: 'outline',
      },
      {
          name: 'Pro',
          price: '$49',
          period: '/month',
          features: ['5 Projects', 'Advanced AI Analysis', 'Priority Build Queue', 'Remove Watermark', 'Push Notifications', 'Email Support'],
          buttonText: 'Manage Plan',
          variant: 'default',
          highlight: true
      },
      {
          name: 'Enterprise',
          price: '$199',
          period: '/month',
          features: ['Unlimited Projects', 'Custom Native Modules', 'Dedicated Build Workers', 'White-labeling', 'SLA Guarantee', '24/7 Phone Support'],
          buttonText: 'Upgrade to Enterprise',
          variant: 'outline',
      }
  ]

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
        <p className="text-muted-foreground mt-1">Manage your plan, limits, and billing cycle.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-white/10 shadow-premium-glow flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Current Plan: <span className="text-primary">{currentPlan}</span>
              </h2>
              <p className="text-muted-foreground">Your plan renews on <strong className="text-white">December 24, 2023</strong>.</p>
          </div>
          <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 bg-background/50 text-red-400 hover:bg-red-500/10 hover:text-red-500">Cancel Subscription</Button>
              <Button className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg">Change Plan</Button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
              <div key={plan.name} className={`relative p-8 rounded-2xl border ${plan.highlight ? 'border-primary/50 shadow-premium-glow bg-white/5' : 'border-white/10 glass-panel'} flex flex-col`}>
                  {plan.highlight && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <Badge className="bg-primary text-white border-0 py-1 px-3">Most Popular</Badge>
                      </div>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                      {plan.price}
                      <span className="ml-1 text-xl font-medium text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mt-8 space-y-4 flex-1">
                      {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                              <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                              <span className="text-sm text-gray-300">{feature}</span>
                          </li>
                      ))}
                  </ul>
                  <Button className={`w-full mt-8 ${plan.highlight ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}>
                      {plan.buttonText}
                  </Button>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                      <h3 className="font-semibold text-lg">Payment Methods</h3>
                      <p className="text-sm text-muted-foreground">Manage your cards and billing address.</p>
                  </div>
              </div>
              <Button variant="outline" className="border-white/10">Manage</Button>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Box className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                      <h3 className="font-semibold text-lg">Usage & Limits</h3>
                      <p className="text-sm text-muted-foreground">Track your API calls and build minutes.</p>
                  </div>
              </div>
              <Button variant="outline" className="border-white/10">View Usage</Button>
          </div>
      </div>
    </div>
  )
}
