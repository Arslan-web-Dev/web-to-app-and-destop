import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BuildService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('build-queue') private readonly buildQueue: Queue,
  ) {}

  async createBuild(userId: string, data: any) {
    const project = await this.prisma.project.findFirst({
      where: { id: data.projectId, ownerId: userId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const nextBuildNumber = (await this.prisma.buildJob.count({
      where: { projectId: data.projectId },
    })) + 1;

    const build = await this.prisma.buildJob.create({
      data: {
        projectId: data.projectId,
        platform: data.platform,
        format: data.format,
        version: data.version || '1.0.0',
        buildNumber: nextBuildNumber,
        features: data.features || [],
        status: 'QUEUED',
      },
    });

    // Add to Redis queue for workers to pick up
    const queueName = `build-${data.platform.toLowerCase().split('_')[0]}`;
    await this.buildQueue.add(queueName, {
      buildId: build.id,
      projectId: data.projectId,
      platform: data.platform,
      format: data.format,
      version: data.version || '1.0.0',
      features: data.features || [],
      sourceCodeUrl: project.zipFileUrl || '',
    });

    return build;
  }

  async getBuilds(userId: string, projectId: string) {
    return this.prisma.buildJob.findMany({
      where: {
        projectId,
        project: { ownerId: userId },
      },
      orderBy: { queuedAt: 'desc' },
    });
  }

  async getBuildDetails(userId: string, buildId: string) {
    const build = await this.prisma.buildJob.findFirst({
      where: {
        id: buildId,
        project: { ownerId: userId },
      },
      include: {
        logs: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!build) {
      throw new NotFoundException('Build job not found');
    }

    return build;
  }
}
