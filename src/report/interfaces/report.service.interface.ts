import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { SendReportReq } from '../dtos/send-report.req';
import { ReportListReq } from '../dtos/report-list.req';

export interface IReportService {
  sendReport(accessTokenUser: JwtAccessTokenReq, sendReportReq: SendReportReq);
  getReportList(accessTokenUser: JwtAccessTokenReq, reportListReq: ReportListReq);
}
