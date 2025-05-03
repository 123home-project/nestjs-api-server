import { Report } from '../entities/report.entity';
import { ReportType } from '../types/report.type';

export interface IReportRepository {
  addReport(report: Report): Promise<Report>;
  getReports(userId: number, keyword: string, limit: number, offset: number, reportType: ReportType): Promise<Report[]>;
}
