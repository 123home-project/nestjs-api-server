import { IsEnum, IsNumber } from 'class-validator';
import { LoginPlatformType } from '../types/login-platform.type';
import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshTokenReq {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;
}
