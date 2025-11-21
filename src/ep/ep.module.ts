import { Module } from '@nestjs/common';
import { EpController } from './ep.controller';
import { EpService } from './ep.service';

@Module({
  controllers: [EpController],
  providers: [EpService]
})
export class EpModule {}
