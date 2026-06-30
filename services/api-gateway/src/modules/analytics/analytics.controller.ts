import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Analytics')
@Controller({ path: 'analytics', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user workspace analytics' })
  async getStats(@CurrentUser() user: any) {
    return this.analyticsService.getUserStats(user.sub);
  }

  @Get('system')
  @ApiOperation({ summary: 'Get administrative system health overview' })
  async getSystemStats() {
    return this.analyticsService.getAdminStats();
  }
}
