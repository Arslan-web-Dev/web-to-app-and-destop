import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';

@Injectable()
export class TwoFactorService {
  generateSecret(userId: string) {
    const secret = speakeasy.generateSecret({
      name: `UniversalWebToNative:${userId}`,
      length: 32,
    });
    return secret;
  }

  async generateQRCode(secret: speakeasy.GeneratedSecret): Promise<string> {
    return QRCode.toDataURL(secret.otpauth_url);
  }

  verify(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    });
  }

  generateBackupCodes(): string[] {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    return codes;
  }
}
