import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ReportDto } from './report.dto';

export class ReportReplyDto {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => ReportDto)
  @IsOptional()
  @Expose()
  report: ReportDto;

  @IsString()
  @Expose()
  contents: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
