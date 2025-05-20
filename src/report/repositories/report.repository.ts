import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { IReportRepository } from '../interfaces/report.repository.interface';
import { ReportType } from '../types/report.type';

@Injectable()
export class ReportRepository extends Repository<Report> implements IReportRepository {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async addReport(report: Report): Promise<Report> {
    return this.save(report);
  }

  async getReports(
    userId: number,
    keyword: string,
    limit: number,
    offset: number,
    reportType: ReportType,
  ): Promise<Report[]> {
    return await this.find({
      where: { user: { id: userId }, contents: Like('%' + (keyword ?? '') + '%'), reportType },
      relations: { reportReply: true, user: true },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
