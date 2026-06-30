import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BuildWorker } from './workers/build.worker';
import { BuildController } from './build.controller';
import { BuildService } from './build.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'build-queue',
    }),
  ],
  providers: [BuildWorker, BuildService],
  controllers: [BuildController],
})
export class BuildServiceModule {}
