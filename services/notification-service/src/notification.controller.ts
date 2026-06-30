import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller({ path: 'notifications', version: '1' })
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user notifications' })
  async getNotifications(@CurrentUser() user: any) {
    // Handled by Supabase RLS
    return { message: 'Use Supabase client for real-time notifications' };
  }

  @Post(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(
    @CurrentUser() user: any,
    @Body('notificationId') notificationId: string,
  ) {
    await this.notificationService.markAsRead(notificationId);
    return { success: true };
  }

  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread notification count' })
  async getUnreadCount(@CurrentUser() user: any) {
    const count = await this.notificationService.getUnreadCount(user.sub);
    return { count };
  }
}
