import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportReply } from './entities/report-reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, ReportReply])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ReportModule {}
