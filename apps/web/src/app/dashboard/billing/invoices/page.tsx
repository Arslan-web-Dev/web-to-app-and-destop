'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, FileText, CheckCircle2, Clock } from 'lucide-react'

export default function InvoicesPage() {
  const invoices = [
      { id: 'INV-2023-011', date: 'Nov 24, 2023', amount: '$49.00', status: 'paid', plan: 'Pro Plan - Monthly' },
      { id: 'INV-2023-010', date: 'Oct 24, 2023', amount: '$49.00', status: 'paid', plan: 'Pro Plan - Monthly' },
      { id: 'INV-2023-009', date: 'Sep 24, 2023', amount: '$49.00', status: 'paid', plan: 'Pro Plan - Monthly' },
      { id: 'INV-2023-008', date: 'Aug 24, 2023', amount: '$49.00', status: 'paid', plan: 'Pro Plan - Monthly' },
      { id: 'INV-2023-007', date: 'Jul 24, 2023', amount: '$0.00', status: 'paid', plan: 'Free Plan' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">View and download your past billing invoices.</p>
        </div>
        <Button variant="outline" className="border-white/10 bg-background/50">
            Download All (ZIP)
        </Button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border-white/10 shadow-premium-glow">
          <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/5">
                  <tr>
                      <th className="px-6 py-4 font-semibold">Invoice ID</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Description</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-2 font-mono text-white">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  {invoice.id}
                              </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{invoice.date}</td>
                          <td className="px-6 py-4 text-gray-300">{invoice.plan}</td>
                          <td className="px-6 py-4 font-mono font-medium">{invoice.amount}</td>
                          <td className="px-6 py-4">
                              {invoice.status === 'paid' ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-0 flex w-fit items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Paid</Badge>
                              ) : (
                                  <Badge className="bg-yellow-500/10 text-yellow-500 border-0 flex w-fit items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>
                              )}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                                  <Download className="h-4 w-4 mr-2" /> PDF
                              </Button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
          <h3 className="font-semibold text-lg">Billing Information</h3>
          <div className="bg-background/50 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Company Name</p>
                  <p className="text-sm font-medium">Acme Corp Ltd.</p>
              </div>
              <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">VAT/Tax ID</p>
                  <p className="text-sm font-medium">GB 123 4567 89</p>
              </div>
              <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Billing Address</p>
                  <p className="text-sm text-gray-300">123 Tech Lane, Innovation Park<br/>London, SW1A 1AA<br/>United Kingdom</p>
              </div>
          </div>
          <Button variant="outline" className="border-white/10">Update Billing Details</Button>
      </div>
    </div>
  )
}
