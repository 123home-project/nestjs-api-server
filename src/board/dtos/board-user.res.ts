import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BoardUserRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;
}
