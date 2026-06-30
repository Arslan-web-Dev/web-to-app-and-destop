'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabaseClient } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

export type Project = Database['public']['Tables']['projects']['Row']

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('projects')
        .select(`
          *,
          analyses(*),
          recommendations(*),
          generated_apps(*),
          build_jobs(*)
        `)
        .eq('id', projectId)
        .single()

      if (error) throw error
      return data
    },
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (project: Database['public']['Tables']['projects']['Insert']) => {
      const { data, error } = await supabaseClient
        .from('projects')
        .insert(project)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useBuilds() {
  return useQuery({
    queryKey: ['builds'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('build_jobs')
        .select(`
          *,
          projects(name)
        `)
        .order('queued_at', { ascending: false })
        .limit(50)

      if (error) throw error
      return data
    },
  })
}

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('notifications')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export function useRealtimeBuilds(projectId?: string) {
  const queryClient = useQueryClient()

  useQuery({
    queryKey: ['realtime-builds', projectId],
    queryFn: async () => {
      const channel = supabaseClient
        .channel('build_jobs')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'build_jobs',
            filter: projectId ? `project_id=eq.${projectId}` : undefined,
          },
          (payload) => {
            queryClient.invalidateQueries({ queryKey: ['builds'] })
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
          }
        )
        .subscribe()

      return () => {
        supabaseClient.removeChannel(channel)
      }
    },
  })
}
