import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { projectId, url } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase
      .from('projects')
      .update({ status: 'ANALYZING' })
      .eq('id', projectId)

    const aiServiceUrl = Deno.env.get('AI_SERVICE_URL')
    const response = await fetch(`${aiServiceUrl}/api/v1/analyze/website`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, deep_analysis: true }),
    })

    if (!response.ok) {
      throw new Error('AI analysis failed')
    }

    const analysisResult = await response.json()

    const { data: analysis, error } = await supabase
      .from('analyses')
      .insert({
        project_id: projectId,
        detected_framework: analysisResult.results.framework?.primary_framework?.name,
        framework_version: analysisResult.results.framework?.primary_framework?.version,
        framework_confidence: analysisResult.results.framework?.primary_framework?.confidence,
        pages: analysisResult.results.pages,
        routes: analysisResult.results.routes,
        navigation: analysisResult.results.navigation,
        has_auth: analysisResult.results.auth?.has_auth ?? false,
        auth_type: analysisResult.results.auth?.primary_auth?.type,
        has_database: analysisResult.results.database?.has_database ?? false,
        database_type: analysisResult.results.database?.primary_database?.type,
        has_api: analysisResult.results.api?.has_api ?? false,
        api_type: analysisResult.results.api?.primary_api?.type,
        has_payment: analysisResult.results.features?.has_payment ?? false,
        has_analytics: analysisResult.results.features?.has_analytics ?? false,
        has_cms: analysisResult.results.features?.has_cms ?? false,
        has_admin_panel: analysisResult.results.features?.has_admin_panel ?? false,
        components: analysisResult.results.ui?.components,
        theme: analysisResult.results.ui?.theme,
        has_dark_mode: analysisResult.results.ui?.dark_mode?.has_dark_mode ?? false,
        is_responsive: analysisResult.results.ui?.responsive?.is_responsive ?? false,
        performance_score: analysisResult.results.performance?.score,
        accessibility_score: analysisResult.results.accessibility?.score,
        seo_score: analysisResult.results.seo?.score,
        security_score: analysisResult.results.security?.score,
        broken_links: analysisResult.results.broken_links,
        missing_images: analysisResult.results.missing_images,
        large_assets: analysisResult.results.large_assets,
        unused_code: analysisResult.results.unused_code,
        security_risks: analysisResult.results.security_risks,
        raw_analysis: analysisResult.results,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    await supabase
      .from('projects')
      .update({ status: 'ANALYZED' })
      .eq('id', projectId)

    if (analysisResult.results.recommendations?.length > 0) {
      const recommendations = analysisResult.results.recommendations.map((rec: any) => ({
        project_id: projectId,
        category: rec.category,
        severity: rec.severity,
        title: rec.title,
        description: rec.description,
        suggestion: rec.suggestion,
        code_example: rec.code_example,
      }))
      await supabase.from('recommendations').insert(recommendations)
    }

    const { data: project } = await supabase
      .from('projects')
      .select('owner_id, name')
      .eq('id', projectId)
      .single()

    if (project) {
      await supabase.from('notifications').insert({
        user_id: project.owner_id,
        type: 'ANALYSIS_COMPLETE',
        title: 'Analysis Complete',
        message: `Analysis for "${project.name}" is complete.`,
        data: { project_id: projectId },
      })
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Analysis error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
