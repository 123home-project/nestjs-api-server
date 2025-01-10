import { IsEnum, IsNumber } from 'class-validator';
import { LoginPlatformType } from '../types/LoginPlatformType';

export class JwtRefreshTokenDto {
  @IsNumber()
  userId: number;

  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;
}
