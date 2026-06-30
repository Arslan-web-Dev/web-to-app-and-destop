import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Projects')
@Controller({ path: 'projects', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.projectService.create(user.sub, body);
  }

  @Get()
  @ApiOperation({ summary: 'List user projects' })
  async findAll(@CurrentUser() user: any) {
    return this.projectService.findAll(user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project details' })
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.projectService.findOne(user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project settings' })
  async update(@CurrentUser() user: any, @Param('id') id: string, @Body() body: any) {
    return this.projectService.update(user.sub, id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.projectService.remove(user.sub, id);
  }
}
