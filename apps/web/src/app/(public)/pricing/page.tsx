'use client'

import React, { useState } from 'react'
import { Check, Info, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Plan {
  name: string
  priceMonthly: number
  priceYearly: number
  description: string
  features: string[]
  cta: string
  popular?: boolean
  limits: string
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')

  const plans: Plan[] = [
    {
      name: 'Starter',
      priceMonthly: 29,
      priceYearly: 19,
      description: 'Ideal for basic websites looking to establish an initial mobile app presence.',
      features: ['2 Active Projects', '5 Native Builds / Mo', 'Basic WebView wrapper', 'Online builder preview'],
      limits: '2 Projects, 5 builds/mo',
      cta: 'Start with Starter',
    },
    {
      name: 'Professional',
      priceMonthly: 79,
      priceYearly: 49,
      description: 'Perfect for production apps requiring biometrics, pushes, and updates.',
      features: [
        '10 Active Projects',
        '30 Native Builds / Mo',
        'Access to iOS & Android APIs',
        'Custom PWA offline config',
        'Push notifications support',
      ],
      limits: '10 Projects, 30 builds/mo',
      cta: 'Go Professional',
      popular: true,
    },
    {
      name: 'Business',
      priceMonthly: 199,
      priceYearly: 149,
      description: 'Best for agencies and organizations managing high-frequency client bundles.',
      features: [
        'Unlimited Projects',
        '100 Native Builds / Mo',
        'Dedicated build compiler nodes',
        'Priority review scans',
        'White-label configuration options',
        'Developer API key keys',
      ],
      limits: 'Unlimited Projects, 100 builds/mo',
      cta: 'Contact Sales',
    },
  ]

  const faqs = [
    { q: 'Are these app packages ready for App Stores?', a: 'Yes, our compiler generates standard, sandboxed .ipa (iOS) and .apk/.aab (Android) binaries that are fully compliant with Apple and Google Developer Store guidelines.' },
    { q: 'Do you assist with store submission?', a: 'Professional and Business tier subscribers get detailed checklists, automated asset sizing tools, and optional managed submissions to app store accounts.' },
    { q: 'Can I cancel or change plans at any time?', a: 'Yes, you can upgrade, downgrade, or cancel your active subscription plan directly inside the Billing settings page with no penalty.' },
    { q: 'What happens if my build fails?', a: 'Build errors due to environment or compiler issues do not consume your monthly build credits. Our support team actively reviews failed logs to fix configuration settings.' },
  ]

  return (
    <div className="space-y-24 py-10">
      {/* Header & Toggle */}
      <section className="text-center space-y-6 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Choose a plan that fits your application scope. Save up to 35% with annual billing.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full p-1 bg-white/5 mx-auto">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              billingPeriod === 'monthly' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              billingPeriod === 'yearly' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'
            }`}
          >
            Yearly (Save 35%)
          </button>
        </div>
      </section>

      {/* Plans Pricing Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = billingPeriod === 'yearly' ? plan.priceYearly : plan.priceMonthly
          return (
            <div
              key={plan.name}
              className={`glass-panel border rounded-2xl p-8 relative flex flex-col justify-between ${
                plan.popular ? 'border-primary/80 shadow-premium-glow ring-2 ring-primary/20' : 'shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-2 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline text-white">
                  <span className="text-4xl md:text-5xl font-extrabold">$</span>
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    {price}
                  </span>
                  <span className="text-muted-foreground text-xs ml-2">/ month</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">Included Features</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-2.5 text-xs">
                        <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <Link href="/register">
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'variant-outline border-white/10 hover:bg-white/5'}`}>
                    {plan.cta}
                  </Button>
                </Link>
                <p className="text-[10px] text-muted-foreground text-center mt-3">Quota limit: {plan.limits}</p>
              </div>
            </div>
          )
        })}
      </section>

      {/* FAQ Block */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <HelpCircle className="h-8 w-8 text-secondary mx-auto animate-bounce" />
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Pricing FAQ</h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Quick responses to commonly asked pricing, invoicing, and platform capability questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-panel p-6 border rounded-xl space-y-2">
              <h4 className="font-semibold text-sm text-white">{faq.q}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
