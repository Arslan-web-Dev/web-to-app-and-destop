'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Get in touch</h1>
              <p className="text-xl text-muted-foreground">Have questions about our platform or enterprise plans? We're here to help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                  <div className="glass-panel p-8 rounded-2xl border-white/10">
                      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                      <div className="space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="p-3 bg-primary/20 rounded-xl">
                                  <Mail className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                  <h3 className="font-semibold text-lg">Email Us</h3>
                                  <p className="text-muted-foreground mb-1">Our team typically responds within 24 hours.</p>
                                  <a href="mailto:support@uwtb.com" className="font-medium text-white hover:text-primary transition-colors">support@universal-w2n.com</a>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="p-3 bg-emerald-500/20 rounded-xl">
                                  <MessageSquare className="h-6 w-6 text-emerald-500" />
                              </div>
                              <div>
                                  <h3 className="font-semibold text-lg">Live Chat</h3>
                                  <p className="text-muted-foreground mb-1">Available Monday to Friday, 9am - 5pm EST.</p>
                                  <button className="font-medium text-white hover:text-emerald-500 transition-colors">Start a chat</button>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="p-3 bg-blue-500/20 rounded-xl">
                                  <MapPin className="h-6 w-6 text-blue-500" />
                              </div>
                              <div>
                                  <h3 className="font-semibold text-lg">Office</h3>
                                  <p className="text-muted-foreground leading-relaxed">
                                      123 Tech Lane, Innovation Park<br />
                                      London, SW1A 1AA<br />
                                      United Kingdom
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="glass-panel p-8 rounded-2xl border-white/10 shadow-premium-glow bg-black/20">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" placeholder="John" className="bg-background/50 border-white/10" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" className="bg-background/50 border-white/10" />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input id="email" type="email" placeholder="john@company.com" className="bg-background/50 border-white/10" />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <select id="subject" className="w-full h-10 px-3 bg-background/50 border border-white/10 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary">
                              <option>Sales Inquiry</option>
                              <option>Technical Support</option>
                              <option>Billing Question</option>
                              <option>Partnership</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px] bg-background/50 border-white/10 resize-none" />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg">
                          Send Message <Send className="ml-2 h-4 w-4" />
                      </Button>
                  </form>
              </div>
          </div>
      </div>
    </div>
  )
}
