import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BoardTagRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;
}
