import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

@Injectable()
export class NotificationService {
  private supabase: SupabaseClient;
  private resend: Resend;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  // Send email notification
  async sendEmail({
    to,
    subject,
    html,
    text,
    from = 'Universal Web to Native <notifications@universalwebtonative.com>',
  }: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    from?: string;
  }) {
    try {
      const { data, error } = await this.resend.emails.send({
        from,
        to,
        subject,
        html,
        text,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Email send failed:', error);
      throw error;
    }
  }

  // Create in-app notification
  async createNotification({
    userId,
    type,
    title,
    message,
    data = {},
  }: {
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, any>;
  }) {
    const { error } = await this.supabase.from('notifications').insert({
      user_id: userId,
      type,
      title,
      message,
      data,
    });

    if (error) throw error;

    // Send real-time notification via Supabase
    await this.supabase.channel('notifications').send({
      type: 'broadcast',
      event: 'new_notification',
      payload: { userId, title, message },
    });
  }

  // Send build completion notification
  async sendBuildCompleteNotification(userId: string, projectName: string, buildId: string) {
    await this.createNotification({
      userId,
      type: 'BUILD_COMPLETE',
      title: 'Build Complete',
      message: `Your build for "${projectName}" is ready for download!`,
      data: { build_id: buildId },
    });

    // Also send email
    const { data: user } = await this.supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (user?.email) {
      await this.sendEmail({
        to: user.email,
        subject: `Build Complete - ${projectName}`,
        html: `
          <h1>Your Build is Ready!</h1>
          <p>Hi ${user.name || 'there'},</p>
          <p>Your native app build for "${projectName}" has completed successfully.</p>
          <a href="${process.env.FRONTEND_URL}/dashboard/builds/${buildId}" 
             style="display:inline-block;padding:12px 24px;background:#0070f3;color:white;text-decoration:none;border-radius:6px;">
            Download Build
          </a>
        `,
      });
    }
  }

  // Send build failure notification
  async sendBuildFailedNotification(userId: string, projectName: string, buildId: string, error: string) {
    await this.createNotification({
      userId,
      type: 'BUILD_FAILED',
      title: 'Build Failed',
      message: `Build for "${projectName}" failed: ${error}`,
      data: { build_id: buildId, error },
    });
  }

  // Send analysis complete notification
  async sendAnalysisCompleteNotification(userId: string, projectId: string, projectName: string) {
    await this.createNotification({
      userId,
      type: 'ANALYSIS_COMPLETE',
      title: 'Analysis Complete',
      message: `AI analysis for "${projectName}" is complete. View results to generate your native app.`,
      data: { project_id: projectId },
    });
  }

  // Send payment success notification
  async sendPaymentSuccessNotification(userId: string, amount: number, plan: string) {
    await this.createNotification({
      userId,
      type: 'PAYMENT_SUCCESS',
      title: 'Payment Successful',
      message: `Your payment of $${amount} for ${plan} plan was successful.`,
      data: { amount, plan },
    });
  }

  // Send subscription expiring notification
  async sendSubscriptionExpiringNotification(userId: string, daysLeft: number) {
    await this.createNotification({
      userId,
      type: 'SUBSCRIPTION_EXPIRING',
      title: 'Subscription Expiring Soon',
      message: `Your subscription expires in ${daysLeft} days. Renew now to avoid interruption.`,
      data: { days_left: daysLeft },
    });
  }

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { error } = await this.supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', notificationId);

    if (error) throw error;
  }

  // Get unread count
  async getUnreadCount(userId: string) {
    const { count, error } = await this.supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  }

  // Send bulk notification (for admin)
  async sendBulkNotification({
    userIds,
    type,
    title,
    message,
  }: {
    userIds: string[];
    type: string;
    title: string;
    message: string;
  }) {
    const notifications = userIds.map((userId) => ({
      user_id: userId,
      type,
      title,
      message,
    }));

    const { error } = await this.supabase.from('notifications').insert(notifications);
    if (error) throw error;
  }
}
