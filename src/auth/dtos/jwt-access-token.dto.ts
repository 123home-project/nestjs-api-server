import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { LoginPlatformType } from '../types/LoginPlatformType';

export class JwtAccessTokenDto {
  @IsNumber()
  userId: number;

  @IsString()
  nickname: string;

  @IsDate()
  registerDate: Date;

  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;

  @IsBoolean()
  verify: boolean;
}
