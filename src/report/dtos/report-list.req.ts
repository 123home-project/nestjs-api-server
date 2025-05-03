import { IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ReportType } from '../types/report.type';

export class ReportListReq {
  @ApiPropertyOptional({ description: '검색 키워드' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  keyword?: string;

  @ApiPropertyOptional({ description: '보여줄 개수', default: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit?: number = 100;

  @ApiPropertyOptional({ description: '시작 번호', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;

  @ApiProperty({ description: '신고 타입' })
  @IsEnum(ReportType)
  reportType: ReportType;
}
