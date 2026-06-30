import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: any) {
    return this.userService.findOne(user.sub);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() body: { name?: string; avatar?: string },
  ) {
    return this.userService.updateProfile(user.sub, body);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get user dashboard overview stats' })
  async getDashboard(@CurrentUser() user: any) {
    return this.userService.getDashboardData(user.sub);
  }
}
