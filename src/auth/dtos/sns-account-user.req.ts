import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { LoginPlatformType } from '../types/login-platform.type';

export class SnsAccountUserReq {
  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;

  @IsString()
  accountId: string;

  @IsString()
  name: string;

  @IsEmail()
  email?: string;

  @IsBoolean()
  verify: boolean;
}
