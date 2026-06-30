'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Globe, Github, Upload, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'input' | 'analyzing' | 'results'>('input')
  const [url, setUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const createProject = useMutation({
    mutationFn: async (data: { name: string; url: string }) => {
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const { data: project, error } = await supabaseClient
        .from('projects')
        .insert({
          name: data.name,
          slug,
          source_type: 'WEBSITE_URL',
          website_url: data.url,
          owner_id: user.id,
          status: 'IMPORTING',
        })
        .select()
        .single()

      if (error) throw error
      return project
    },
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setStep('analyzing')

      // Start AI analysis
      startAnalysis(project.id, project.website_url)
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const startAnalysis = async (projectId: string, websiteUrl: string) => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, url: websiteUrl }),
      })

      if (!response.ok) throw new Error('Analysis failed')

      const result = await response.json()

      toast({
        title: 'Analysis Complete',
        description: 'Your website has been analyzed successfully!',
      })

      setOpen(false)
      router.push(`/dashboard/projects/${projectId}/analysis`)
    } catch (error) {
      toast({
        title: 'Analysis Error',
        description: 'Failed to analyze website. Please try again.',
        variant: 'destructive',
      })
      setStep('input')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName || !url) return
    createProject.mutate({ name: projectName, url })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        {step === 'input' && (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter your website URL to start the AI analysis and native app generation.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="url" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="url">
                  <Globe className="mr-2 h-4 w-4" />
                  Website URL
                </TabsTrigger>
                <TabsTrigger value="github">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Awesome App"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website-url">Website URL</Label>
                  <Input
                    id="website-url"
                    placeholder="https://example.com"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="github" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="github-url">GitHub Repository URL</Label>
                  <Input
                    id="github-url"
                    placeholder="https://github.com/username/repo"
                    type="url"
                  />
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4 mt-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your ZIP file here, or click to browse
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                disabled={createProject.isPending}
              >
                {createProject.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Start Analysis
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 'analyzing' && (
          <div className="py-12 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
              <div className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">AI Analysis in Progress</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Our AI is analyzing your website structure, detecting frameworks, 
                and identifying native features...
              </p>
            </div>
            <div className="space-y-3 max-w-sm mx-auto">
              <AnalysisStep label="Crawling website" status="complete" />
              <AnalysisStep label="Detecting framework" status="complete" />
              <AnalysisStep label="Analyzing UI components" status="in-progress" />
              <AnalysisStep label="Scanning security" status="pending" />
              <AnalysisStep label="Generating recommendations" status="pending" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function AnalysisStep({ label, status }: { label: string; status: 'complete' | 'in-progress' | 'pending' }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        h-5 w-5 rounded-full flex items-center justify-center
        ${status === 'complete' ? 'bg-green-500 text-white' : ''}
        ${status === 'in-progress' ? 'bg-primary text-primary-foreground animate-pulse' : ''}
        ${status === 'pending' ? 'bg-muted text-muted-foreground' : ''}
      `}>
        {status === 'complete' && <Check className="h-3 w-3" />}
        {status === 'in-progress' && <Loader2 className="h-3 w-3 animate-spin" />}
      </div>
      <span className={`
        text-sm
        ${status === 'complete' ? 'text-green-600' : ''}
        ${status === 'in-progress' ? 'text-primary font-medium' : ''}
        ${status === 'pending' ? 'text-muted-foreground' : ''}
      `}>
        {label}
      </span>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}
