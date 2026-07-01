'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Mail, MessageSquare, Compass, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      toast({
        title: 'Message Sent',
        description: 'Thank you! Your message has been sent successfully.',
      })
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 1500)
  }

  return (
    <div className="space-y-24 py-10">
      {/* Header */}
      <section className="text-center space-y-6 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Contact Our Team</h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Need support, enterprise billing adjustments, or custom platform wrapper SDK consulting? Drop us a line.
        </p>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="lg:col-span-2 glass-panel border rounded-2xl p-8 shadow-sm space-y-6">
          {success ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-3 bg-secondary/15 rounded-full text-secondary w-fit mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Thank You!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your message has been sent to our customer care team. We will review it and get back to you within 24 business hours.
              </p>
              <Button onClick={() => setSuccess(false)} variant="outline" className="border-white/10 hover:bg-white/5">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-premium-glow">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-panel border rounded-2xl p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-white">Contact Info</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg h-fit">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wide">Support Desk</h4>
                  <p className="text-xs text-muted-foreground mt-1">support@universalwebtonative.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg h-fit">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wide">Enterprise Relations</h4>
                  <p className="text-xs text-muted-foreground mt-1">enterprise@universalwebtonative.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg h-fit">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wide">Headquarters</h4>
                  <p className="text-xs text-muted-foreground mt-1">100 Pine Street, San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-xs text-muted-foreground">
              <p>SLA support targets: <strong>24h</strong> for Free tier, <strong>4h</strong> for Enterprise subscribers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
