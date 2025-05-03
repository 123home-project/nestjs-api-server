import { Inject, Injectable } from '@nestjs/common';
import { IReportService } from '../interfaces/report.service.interface';
import { SendReportReq } from '../dtos/send-report.req';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { Report } from '../entities/report.entity';
import { IReportRepository } from '../interfaces/report.repository.interface';
import { IUserService } from 'src/user/interfaces/user.service.inteface';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReportService implements IReportService {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('IReportRepository') private readonly reportRepository: IReportRepository,
  ) {}

  async sendReport(accessTokenUser: JwtAccessTokenReq, sendReportReq: SendReportReq) {
    const { contents, reportType } = sendReportReq;
    const { userId } = accessTokenUser;

    const report = new Report();

    const user = await this.userService.getUserById(userId);

    report.user = plainToInstance(User, user);
    report.contents = contents;
    report.reportType = reportType;

    await this.reportRepository.addReport(report);
  }
}
