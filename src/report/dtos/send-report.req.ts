import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType } from '../types/report.type';

export class SendReportReq {
  @ApiProperty({ description: '신고 내용' })
  @IsString()
  contents: string;

  @ApiPropertyOptional({ description: 'report: 신고 / feedback: 문의,버그,개선 사항', default: 'report' })
  @IsOptional()
  @IsEnum(ReportType)
  reportType: ReportType = 'report';
}
