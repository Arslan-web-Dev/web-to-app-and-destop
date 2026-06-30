import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BuildService } from './build.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Builds')
@Controller({ path: 'builds', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post()
  @ApiOperation({ summary: 'Request a native build' })
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.buildService.createBuild(user.sub, body);
  }

  @Get()
  @ApiOperation({ summary: 'List build jobs for a project' })
  async findAll(@CurrentUser() user: any, @Query('projectId') projectId: string) {
    return this.buildService.getBuilds(user.sub, projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get build status and logs' })
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.buildService.getBuildDetails(user.sub, id);
  }
}
