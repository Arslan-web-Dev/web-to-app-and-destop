import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bullmq';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { ProjectModule } from './modules/projects/project.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { BuildModule } from './modules/builds/build.module';
import { BillingModule } from './modules/billing/billing.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { StorageModule } from './modules/storage/storage.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AIChatModule } from './modules/ai-chat/ai-chat.module';

import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { EventBusModule } from './event-bus/event-bus.module';
import { RateLimitGuard } from './guards/rate-limit.guard';

@Module({
  imports: [
    // Redis Integration
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
    }),

    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
      cache: true,
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 100,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 500,
      },
    ]),

    // Queue System (Redis + BullMQ)
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      },
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),

    // Caching
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
          },
          password: process.env.REDIS_PASSWORD,
          ttl: 60 * 60 * 1000, // 1 hour
        }),
      }),
    }),

    // Core Modules
    DatabaseModule,
    LoggerModule,
    EventBusModule,

    // Feature Modules
    AuthModule,
    UserModule,
    ProjectModule,
    AnalysisModule,
    BuildModule,
    BillingModule,
    NotificationModule,
    StorageModule,
    AnalyticsModule,
    AIChatModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class AppModule {}
