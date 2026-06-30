import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GitHubStrategy } from './strategies/github.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { TwoFactorService } from './two-factor.service';
import { PasswordService } from './password.service';
import { RolesGuard } from '../../guards/roles.guard';
import { PermissionsGuard } from '../../guards/permissions.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION || '15m',
          issuer: 'universal-web-to-native',
          audience: 'api',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    TwoFactorService,
    PasswordService,
    JwtStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    GitHubStrategy,
    RolesGuard,
    PermissionsGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, TwoFactorService, PasswordService],
})
export class AuthModule {}
