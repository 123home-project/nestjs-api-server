import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ReportReplyRes {
  @IsNumber()
  @Expose()
  id: number;

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
