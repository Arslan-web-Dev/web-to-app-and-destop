'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Check, ShieldCheck, Zap } from 'lucide-react'

export default function BillingPage() {
  const features = [
    'Unlimited Web to App Conversions',
    'iOS & Android native build workers',
    'Advanced PWA custom configurations',
    'Dedicated high-performance build workers',
    'Custom branding & domain white-labeling',
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription plans, view payment methods, and check usage quotas.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Current Plan & Usage */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">Current Subscription</p>
                <h2 className="text-2xl font-bold mt-1">Professional Plan</h2>
                <p className="text-sm text-muted-foreground mt-1">Renews on August 1, 2026</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-bold">Build Credits</p>
                <p className="text-2xl font-bold">45 / 100</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-bold">AI Scans</p>
                <p className="text-2xl font-bold">12 / 30</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase font-bold">Active Projects</p>
                <p className="text-2xl font-bold">3 / 10</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h2>
            <div className="flex items-center justify-between border rounded-md p-4 bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="h-8 w-12 bg-muted rounded flex items-center justify-center font-bold text-xs border">
                  VISA
                </div>
                <div>
                  <p className="text-sm font-semibold">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/28</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Update
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade Card / Highlights */}
        <div className="space-y-6">
          <div className="border rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="p-2 bg-primary/20 rounded-lg text-primary w-fit">
                <Zap className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Unlimited Access</h2>
              <p className="text-sm text-muted-foreground">
                Get full access to all platform features, unlimited compiler servers, and priority queuing.
              </p>
            </div>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full">Upgrade Plan</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
