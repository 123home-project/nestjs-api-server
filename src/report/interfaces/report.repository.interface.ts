import { Report } from '../entities/report.entity';

export interface IReportRepository {
  addReport(report: Report): Promise<Report>;
}
