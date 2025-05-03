import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { SendReportReq } from '../dtos/send-report.req';

export interface IReportService {
  sendReport(accessTokenUser: JwtAccessTokenReq, sendReportReq: SendReportReq);
}
