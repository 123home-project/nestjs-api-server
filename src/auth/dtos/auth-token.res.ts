import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthTokenRes {
  @IsString()
  @Expose()
  refreshToken: string;

  @IsString()
  @Expose()
  accessToken: string;
}
