import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportReply } from './entities/report-reply.entity';
import { ReportController } from './controllers/report.controller';
import { UserModule } from 'src/user/user.module';
import { ReportService } from './services/report.service';
import { ReportRepository } from './repositories/report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Report, ReportReply]), UserModule],
  controllers: [ReportController],
  providers: [
    { provide: 'IReportService', useClass: ReportService },
    { provide: 'IReportRepository', useClass: ReportRepository },
  ],
})
export class ReportModule {}
