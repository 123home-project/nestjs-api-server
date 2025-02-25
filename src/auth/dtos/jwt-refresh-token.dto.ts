import { IsEnum, IsNumber } from 'class-validator';
import { LoginPlatformType } from '../types/login-platform.type';

export class JwtRefreshTokenDto {
  @IsNumber()
  userId: number;

  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;
}
