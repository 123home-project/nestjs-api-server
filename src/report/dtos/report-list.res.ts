import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ReportUserRes } from './report-user.res';
import { ReportType } from '../types/report.type';
import { ReportReplyRes } from './report-reply.res';

export class ReportListRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => ReportUserRes)
  @Expose()
  user: ReportUserRes;

  @IsString()
  @Expose()
  contents: string;

  @IsEnum(ReportType)
  @Expose()
  reportType: ReportType;

  @ValidateNested()
  @IsOptional()
  @Type(() => ReportReplyRes)
  @Expose()
  reportReply?: ReportReplyRes[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
