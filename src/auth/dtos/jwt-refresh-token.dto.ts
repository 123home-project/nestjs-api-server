import { IsEnum, IsNumber } from 'class-validator';
import { LoginPlatformType } from '../types/LoginPlatformType';

export class jwtRefreshTokenDto {
  @IsNumber()
  userId: number;

  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;
}
