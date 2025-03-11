import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { LoginPlatformType } from '../types/login-platform.type';
import { ApiProperty } from '@nestjs/swagger';

export class JwtAccessTokenReq {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsDate()
  registerDate: Date;

  @ApiProperty()
  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;

  @ApiProperty()
  @IsBoolean()
  verify: boolean;
}
