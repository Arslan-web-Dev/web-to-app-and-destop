import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BuildService {
  private supabase: SupabaseClient;

  constructor(
    @InjectQueue('build-queue') private buildQueue: Queue,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  async createBuild(projectId: string, config: {
    platform: string;
    format: string;
    version: string;
    features: string[];
  }) {
    // Get project info
    const { data: project } = await this.supabase
      .from('projects')
      .select('owner_id, generated_apps(*)')
      .eq('id', projectId)
      .single();

    if (!project) throw new Error('Project not found');

    // Check user plan limits
    const { data: subscription } = await this.supabase
      .from('subscriptions')
      .select('plan, usage_limits, current_usage')
      .eq('user_id', project.owner_id)
      .single();

    const currentBuilds = subscription?.current_usage?.buildsThisMonth || 0;
    const maxBuilds = subscription?.usage_limits?.maxBuildsPerMonth || 10;

    if (maxBuilds !== -1 && currentBuilds >= maxBuilds) {
      throw new Error('Build limit exceeded for current plan');
    }

    // Get next build number
    const { count } = await this.supabase
      .from('build_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId);

    const buildNumber = (count || 0) + 1;

    // Create build job
    const { data: buildJob, error } = await this.supabase
      .from('build_jobs')
      .insert({
        project_id: projectId,
        platform: config.platform,
        format: config.format,
        version: config.version,
        build_number: buildNumber,
        features: config.features,
        status: 'QUEUED',
      })
      .select()
      .single();

    if (error) throw error;

    // Get source code URL from generated app
    const generatedApp = project.generated_apps?.find(
      (app: any) => app.platform === config.platform
    );

    // Add to queue
    await this.buildQueue.add(`build-${config.platform.toLowerCase()}`, {
      buildId: buildJob.id,
      projectId,
      platform: config.platform,
      format: config.format,
      version: config.version,
      features: config.features,
      sourceCodeUrl: generatedApp?.source_code_url,
    }, {
      priority: this.getPriority(subscription?.plan),
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });

    // Update usage
    if (subscription) {
      await this.supabase
        .from('subscriptions')
        .update({
          current_usage: {
            ...subscription.current_usage,
            buildsThisMonth: currentBuilds + 1,
          },
        })
        .eq('user_id', project.owner_id);
    }

    return buildJob;
  }

  private getPriority(plan: string): number {
    const priorities: Record<string, number> = {
      'ENTERPRISE': 1,
      'BUSINESS': 2,
      'PROFESSIONAL': 3,
      'STARTER': 4,
      'FREE': 5,
    };
    return priorities[plan] || 5;
  }
}
