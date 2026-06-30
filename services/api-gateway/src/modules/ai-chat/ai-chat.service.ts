import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AIChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getChatResponse(userId: string, projectId: string, message: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
      include: { analysis: true },
    });

    const context = project?.analysis
      ? `Website: ${project.websiteUrl}. Detected Framework: ${project.analysis.detectedFramework}. features: ${JSON.stringify(project.analysis.routes)}.`
      : `Website: ${project?.websiteUrl || 'unknown'}.`;

    // Fast mock integration with LLM api
    const reply = `Based on your website details (${context}), here is the recommendation for your native app transition: For the login screens we suggest native OAuth with biometric credentials. Is there any specific native module you would like me to detail?`;

    return {
      message: reply,
      timestamp: new Date().toISOString(),
    };
  }
}
