'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Plus, MoreVertical, CheckCircle2 } from 'lucide-react'

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground mt-1">Manage credit cards and preferred payment options.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> Add Method
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-primary/30 shadow-premium-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-primary text-white border-0 shadow-md flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Default</Badge>
              </div>
              
              <div className="flex flex-col h-full justify-between space-y-8">
                  <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-white rounded flex items-center justify-center font-bold text-blue-800 italic">
                          VISA
                      </div>
                  </div>
                  
                  <div>
                      <p className="font-mono text-xl tracking-widest text-white mb-2">•••• •••• •••• 4242</p>
                      <div className="flex justify-between items-end text-sm text-muted-foreground">
                          <div>
                              <p className="text-xs uppercase mb-1">Expires</p>
                              <p className="font-medium text-gray-300">12/25</p>
                          </div>
                          <div>
                              <Button variant="ghost" size="icon" className="hover:bg-white/10 -mr-2">
                                  <MoreVertical className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
              <div className="flex flex-col h-full justify-between space-y-8">
                  <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-[#ff5f00] rounded flex items-center justify-center relative overflow-hidden">
                          <div className="w-5 h-5 rounded-full bg-red-600 absolute left-1 mix-blend-multiply" />
                          <div className="w-5 h-5 rounded-full bg-yellow-400 absolute right-1 mix-blend-multiply" />
                      </div>
                  </div>
                  
                  <div>
                      <p className="font-mono text-xl tracking-widest text-white mb-2">•••• •••• •••• 5555</p>
                      <div className="flex justify-between items-end text-sm text-muted-foreground">
                          <div>
                              <p className="text-xs uppercase mb-1">Expires</p>
                              <p className="font-medium text-gray-300">08/24</p>
                          </div>
                          <div>
                              <Button variant="ghost" size="icon" className="hover:bg-white/10 -mr-2">
                                  <MoreVertical className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-white/10 mt-8 bg-black/20">
          <h3 className="font-semibold text-lg flex items-center gap-2"><CreditCard className="h-5 w-5 text-muted-foreground" /> Security Information</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              We do not store your full credit card details. All payment processing is handled securely by Stripe. Your payment methods are encrypted and compliant with PCI-DSS standards.
          </p>
      </div>
    </div>
  )
}
