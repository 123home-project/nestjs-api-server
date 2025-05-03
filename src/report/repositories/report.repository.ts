import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { IReportRepository } from '../interfaces/report.repository.interface';

@Injectable()
export class ReportRepository extends Repository<Report> implements IReportRepository {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async addReport(report: Report): Promise<Report> {
    return this.save(report);
  }
}
