import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'build-queue',
    }),
  ],
  providers: [BuildService],
  controllers: [BuildController],
  exports: [BuildService],
})
export class BuildModule {}
