import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { PasswordService } from './password.service';
import { TwoFactorService } from './two-factor.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.passwordService.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        status: 'PENDING_VERIFICATION',
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
      },
    });

    const verificationToken = await this.generateVerificationToken(user.id);

    await this.prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'FREE',
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        usageLimits: {
          maxProjects: 3,
          maxBuildsPerMonth: 10,
          maxTeamMembers: 1,
          maxStorageGB: 1,
        },
      },
    });

    return {
      user,
      message: 'Registration successful. Please verify your email.',
    };
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { subscriptions: true },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 'PENDING_VERIFICATION') {
      throw new UnauthorizedException('Please verify your email first');
    }

    if (user.status === 'SUSPENDED') {
      throw new UnauthorizedException('Account suspended. Contact support.');
    }

    if (user.twoFactorEnabled) {
      if (!dto.twoFactorCode) {
        return {
          requiresTwoFactor: true,
          message: 'Two-factor authentication required',
        };
      }

      const isValid2FA = await this.twoFactorService.verify(
        user.twoFactorSecret,
        dto.twoFactorCode,
      );

      if (!isValid2FA) {
        throw new UnauthorizedException('Invalid 2FA code');
      }
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    await this.prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const tokens = await this.generateTokens(user, sessionToken);

    await this.prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entityType: 'USER',
        entityId: user.id,
        ipAddress,
        userAgent,
      },
    });

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const session = await this.prisma.session.findUnique({
        where: { sessionToken: payload.sessionToken },
        include: { user: true },
      });

      if (!session || session.expires < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(session.user, session.sessionToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, sessionToken: string) {
    await this.prisma.session.deleteMany({
      where: { userId, sessionToken },
    });

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'LOGOUT',
        entityType: 'USER',
        entityId: userId,
      },
    });

    return { message: 'Logged out successfully' };
  }

  async oauthLogin(profile: any, provider: string) {
    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
      include: { accounts: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name || profile.displayName,
          avatar: profile.picture || profile.avatar_url,
          emailVerified: true,
          status: 'ACTIVE',
          accounts: {
            create: {
              type: 'oauth',
              provider,
              providerAccountId: profile.id,
            },
          },
        },
        include: { accounts: true },
      });
    } else {
      const existingAccount = user.accounts.find(
        (a) => a.provider === provider && a.providerAccountId === profile.id,
      );

      if (!existingAccount) {
        await this.prisma.account.create({
          data: {
            userId: user.id,
            type: 'oauth',
            provider,
            providerAccountId: profile.id,
          },
        });
      }
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    await this.prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return this.generateTokens(user, sessionToken);
  }

  private async generateTokens(user: any, sessionToken: string) {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      plan: user.plan,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload, sessionToken, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
      },
    );

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  private async generateVerificationToken(userId: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.verificationToken.create({
      data: {
        identifier: userId,
        token,
        expires,
      },
    });

    return token;
  }

  private sanitizeUser(user: any) {
    const { password, twoFactorSecret, mfaBackupCodes, ...sanitized } = user;
    return sanitized;
  }
}
