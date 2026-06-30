import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationService {
  private resend: Resend;

  constructor(private readonly prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_mock');
  }

  async sendEmail({
    to,
    subject,
    html,
    text,
    from = 'notifications@universalwebtonative.com',
  }: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    from?: string;
  }): Promise<any> {
    try {
      return await this.resend.emails.send({
        from,
        to,
        subject,
        html,
        text,
      });
    } catch (error) {
      console.error('Email send failed:', error);
      throw error;
    }
  }

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
    data?: any;
  }) {
    return this.prisma.notification.create({
      data: {
        userId,
        type: type as any,
        title,
        message,
        data: data || {},
      },
    });
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }
}
