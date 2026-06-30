import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Analysis')
@Controller({ path: 'analysis', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post(':projectId/trigger')
  @ApiOperation({ summary: 'Trigger AI analysis on a website project' })
  async trigger(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.analysisService.triggerAnalysis(user.sub, projectId);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get AI analysis results for a project' })
  async findOne(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.analysisService.getAnalysis(user.sub, projectId);
  }
}
