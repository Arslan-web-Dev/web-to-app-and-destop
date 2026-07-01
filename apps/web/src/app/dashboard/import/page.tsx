'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check, Globe, Code, Box, Play, Smartphone, CheckCircle2 } from 'lucide-react'

export default function WebsiteImportPage() {
  const [step, setStep] = useState('1')
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Website Import Wizard</h1>
        <p className="text-muted-foreground mt-1">
          Import and analyze your existing web application for native conversion.
        </p>
      </div>
      
      <Tabs value={step} onValueChange={setStep} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl bg-card border">
          <TabsTrigger value="1" disabled={step !== '1' && step < '1'}>1. URL</TabsTrigger>
          <TabsTrigger value="2" disabled={step !== '2' && step < '2'}>2. Analysis</TabsTrigger>
          <TabsTrigger value="3" disabled={step !== '3' && step < '3'}>3. Configure</TabsTrigger>
          <TabsTrigger value="4" disabled={step !== '4' && step < '4'}>4. Import</TabsTrigger>
        </TabsList>

        <TabsContent value="1" className="space-y-6 max-w-2xl">
          <div className="glass-panel p-8 rounded-2xl space-y-6 shadow-premium-glow">
            <h2 className="text-xl font-semibold">Enter Website URL</h2>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="https://your-website.com" className="pl-10 h-12 text-lg bg-background/50" />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep('2')} className="h-11 bg-gradient-to-r from-primary to-secondary text-white border-0">
                Scan Website <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="2" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl space-y-6 md:col-span-2 shadow-premium-glow">
              <h2 className="text-xl font-semibold">AI Analysis Results</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg flex justify-between items-center border border-white/10">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-primary" />
                    <span className="font-medium">Detected Framework</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">Next.js</Badge>
                </div>
                <div className="p-4 bg-white/5 rounded-lg flex justify-between items-center border border-white/10">
                  <div className="flex items-center gap-3">
                    <Box className="h-5 w-5 text-secondary" />
                    <span className="font-medium">UI Components</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">Tailwind CSS</Badge>
                </div>
                <div className="p-4 bg-white/5 rounded-lg flex justify-between items-center border border-white/10">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500" />
                    <span className="font-medium">PWA Ready</span>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500">Yes</Badge>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                <Button variant="ghost" onClick={() => setStep('1')}>Back</Button>
                <Button onClick={() => setStep('3')} className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="3" className="space-y-6 max-w-2xl">
            <div className="glass-panel p-8 rounded-2xl space-y-6 shadow-premium-glow">
                <h2 className="text-xl font-semibold">Configuration</h2>
                <p className="text-muted-foreground">Adjust the import settings before proceeding.</p>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 rounded-xl">
                       <div className="flex items-center gap-3">
                           <Smartphone className="h-5 w-5 text-muted-foreground" />
                           <div>
                               <p className="font-medium">Include Mobile Layout</p>
                               <p className="text-xs text-muted-foreground">Optimize UI for mobile devices</p>
                           </div>
                       </div>
                       <input type="checkbox" className="toggle" defaultChecked />
                   </div>
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
                    <Button variant="ghost" onClick={() => setStep('2')}>Back</Button>
                    <Button onClick={() => setStep('4')} className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                      Start Import <Play className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="4" className="space-y-6 max-w-2xl">
            <div className="glass-panel p-12 rounded-2xl text-center space-y-6 shadow-premium-glow flex flex-col items-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 glow-indigo">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gradient-primary">Import Completed</h2>
                <p className="text-muted-foreground max-w-md">Your website has been successfully imported and analyzed. It is now ready for native building.</p>
                <div className="pt-8">
                    <Button className="h-12 px-10 bg-gradient-to-r from-primary to-secondary text-white border-0 text-lg">
                      View Project
                    </Button>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
