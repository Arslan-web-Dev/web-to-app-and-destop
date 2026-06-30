import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  async getPresignedUploadUrl(userId: string, fileName: string) {
    // Generate S3 presigned URL
    const bucket = process.env.AWS_S3_BUCKET || 'universal-web-to-native-artifacts';
    const key = `uploads/${userId}/${Date.now()}-${fileName}`;
    return {
      uploadUrl: `https://${bucket}.s3.amazonaws.com/${key}?mock-presigned-signature=1`,
      key,
    };
  }

  async getDownloadUrl(key: string) {
    const bucket = process.env.AWS_S3_BUCKET || 'universal-web-to-native-artifacts';
    return {
      downloadUrl: `https://${bucket}.s3.amazonaws.com/${key}?mock-presigned-signature-download=1`,
    };
  }
}
