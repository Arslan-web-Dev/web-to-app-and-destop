import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AIChatService } from './ai-chat.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('AIChat')
@Controller({ path: 'ai-chat', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIChatController {
  constructor(private readonly aiChatService: AIChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send message to project AI chatbot assistant' })
  async sendMessage(
    @CurrentUser() user: any,
    @Body('projectId') projectId: string,
    @Body('message') message: string,
  ) {
    return this.aiChatService.getChatResponse(user.sub, projectId, message);
  }
}
