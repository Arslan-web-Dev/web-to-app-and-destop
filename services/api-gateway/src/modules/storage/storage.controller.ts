import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Storage')
@Controller({ path: 'storage', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presigned-upload')
  @ApiOperation({ summary: 'Get a presigned S3 URL to upload artifacts' })
  async getUploadUrl(
    @CurrentUser() user: any,
    @Body('fileName') fileName: string,
  ) {
    return this.storageService.getPresignedUploadUrl(user.sub, fileName);
  }
}
