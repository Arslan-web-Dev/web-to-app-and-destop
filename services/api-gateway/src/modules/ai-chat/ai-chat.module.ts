import { Module } from '@nestjs/common';
import { AIChatService } from './ai-chat.service';
import { AIChatController } from './ai-chat.controller';

@Module({
  providers: [AIChatService],
  controllers: [AIChatController],
  exports: [AIChatService],
})
export class AIChatModule {}
