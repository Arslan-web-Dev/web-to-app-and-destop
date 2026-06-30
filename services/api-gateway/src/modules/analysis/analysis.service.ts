import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  async triggerAnalysis(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.prisma.project.update({
      where: { id: projectId },
      data: { status: 'ANALYZING' },
    });

    // Invoke Python AI Service endpoint asynchronously
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    
    // Fire and forget, or execute asynchronously
    fetch(`${aiServiceUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        website_url: project.websiteUrl,
        github_url: project.githubUrl,
        zip_file_url: project.zipFileUrl,
      }),
    }).catch(err => console.error('Error invoking AI service analysis:', err));

    return {
      message: 'Analysis triggered successfully',
      status: 'ANALYZING',
    };
  }

  async getAnalysis(userId: string, projectId: string) {
    const analysis = await this.prisma.analysis.findFirst({
      where: {
        project: {
          id: projectId,
          ownerId: userId,
        },
      },
    });

    if (!analysis) {
      throw new NotFoundException('No analysis found for this project');
    }

    return analysis;
  }
}
