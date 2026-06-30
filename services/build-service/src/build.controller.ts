import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BuildService } from './build.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('Builds')
@Controller({ path: 'builds', version: '1' })
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new build' })
  async createBuild(
    @CurrentUser() user: any,
    @Body() config: {
      projectId: string;
      platform: string;
      format: string;
      version: string;
      features: string[];
    },
  ) {
    return this.buildService.createBuild(config.projectId, config);
  }
}
