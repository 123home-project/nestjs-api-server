import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ReportUserRes } from './report-user.res';
import { ReportType } from '../types/report.type';
import { ReportReplyRes } from './report-reply.res';
import { ApiProperty } from '@nestjs/swagger';

export class ReportListRes {
  @ApiProperty({ description: '신고 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '신고 유저', type: ReportUserRes })
  @ValidateNested()
  @Type(() => ReportUserRes)
  @Expose()
  user: ReportUserRes;

  @ApiProperty({ description: '내용', example: '안녕' })
  @IsString()
  @Expose()
  contents: string;

  @ApiProperty({ description: '신고 타입', example: 'report', enum: ReportType })
  @IsEnum(ReportType)
  @Expose()
  reportType: ReportType;

  @ApiProperty({ description: '신고 답변', type: [ReportReplyRes] })
  @ValidateNested()
  @IsOptional()
  @Type(() => ReportReplyRes)
  @Expose()
  reportReply?: ReportReplyRes[];

  @ApiProperty({ description: '생성일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
