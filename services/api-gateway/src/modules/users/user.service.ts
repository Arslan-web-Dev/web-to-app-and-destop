import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        subscriptions: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(id: string, data: { name?: string; avatar?: string }) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.sanitizeUser(user);
  }

  async getDashboardData(userId: string) {
    const projectCount = await this.prisma.project.count({
      where: { ownerId: userId },
    });

    const activeBuilds = await this.prisma.buildJob.count({
      where: {
        projectId: {
          in: (await this.prisma.project.findMany({
            where: { ownerId: userId },
            select: { id: true },
          })).map(p => p.id),
        },
        status: 'RUNNING',
      },
    });

    const subscription = await this.prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      projectCount,
      activeBuilds,
      plan: subscription?.plan || 'FREE',
      status: subscription?.status || 'ACTIVE',
    };
  }

  private sanitizeUser(user: any) {
    const { password, twoFactorSecret, mfaBackupCodes, ...sanitized } = user;
    return sanitized;
  }
}
