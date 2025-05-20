import { Module } from '@nestjs/common';
import { TimeService } from './services/time.service';

@Module({
  imports: [],
  providers: [{ provide: 'ITimeService', useClass: TimeService }],
  exports: [{ provide: 'ITimeService', useClass: TimeService }],
})
export class TimeModule {}
