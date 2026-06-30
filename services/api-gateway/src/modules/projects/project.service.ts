import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        slug,
        sourceType: data.sourceType || 'WEBSITE_URL',
        websiteUrl: data.websiteUrl,
        githubUrl: data.githubUrl,
        zipFileUrl: data.zipFileUrl,
        ownerId: userId,
        status: 'IMPORTING',
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        analysis: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
      include: {
        analysis: true,
        recommendations: true,
        generatedApps: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(userId: string, id: string, data: any) {
    await this.findOne(userId, id);
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
