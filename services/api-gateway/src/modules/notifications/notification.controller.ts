import { Controller, Get, Post, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller({ path: 'notifications', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for user' })
  async getNotifications(@CurrentUser() user: any) {
    return this.notificationService.getNotifications(user.sub);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get user unread notifications count' })
  async getUnreadCount(@CurrentUser() user: any) {
    return this.notificationService.getUnreadCount(user.sub);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.notificationService.markAsRead(user.sub, id);
  }
}
