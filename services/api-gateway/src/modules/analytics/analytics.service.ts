import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserStats(userId: string) {
    const buildsCount = await this.prisma.buildJob.count({
      where: { project: { ownerId: userId } },
    });

    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: { userId, status: 'ACTIVE' },
    });

    const totalSpent = await this.prisma.payment.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    return {
      totalBuilds: buildsCount,
      activePlans: activeSubscriptions.map(sub => sub.plan),
      totalBillingUSD: totalSpent._sum.amount || 0,
    };
  }

  async getAdminStats() {
    const totalUsers = await this.prisma.user.count();
    const totalProjects = await this.prisma.project.count();
    const totalBuilds = await this.prisma.buildJob.count();
    
    return {
      totalUsers,
      totalProjects,
      totalBuilds,
    };
  }
}
