import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ReportUserRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;
}
