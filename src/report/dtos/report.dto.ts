import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ReportType } from '../types/report.type';
import { UserDto } from 'src/user/dtos/user.dto';
import { ReportReplyDto } from './report-reply.dto';

export class ReportDto {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user: UserDto;

  @IsString()
  @Expose()
  contents: string;

  @IsEnum(ReportType)
  @Expose()
  reportType: ReportType;

  @ValidateNested()
  @Type(() => ReportReplyDto)
  @IsOptional()
  @Expose()
  reportReply?: ReportReplyDto[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
