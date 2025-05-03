import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { SendReportReq } from '../dtos/send-report.req';
import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { AccessTokenUser } from 'src/auth/decorators/access-token.decorator';
import { AccessTokenAuthGuard } from 'src/auth/guards/jwt-access-token.auth.guard';
import { IReportService } from '../interfaces/report.service.interface';

@Controller('report')
export class ReportController {
  constructor(@Inject('IReportService') private readonly reportService: IReportService) {}

  @Post('/')
  @UseGuards(AccessTokenAuthGuard)
  @ApiCreatedResponse({ description: '신고하기' })
  async sendReport(@AccessTokenUser() accessTokenUser: JwtAccessTokenReq, @Body() sendReportReq: SendReportReq) {
    return await this.reportService.sendReport(accessTokenUser, sendReportReq);
  }
}
