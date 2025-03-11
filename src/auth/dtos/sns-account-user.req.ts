import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { LoginPlatformType } from '../types/login-platform.type';
import { ApiProperty } from '@nestjs/swagger';

export class SnsAccountUserReq {
  @ApiProperty()
  @IsEnum(LoginPlatformType)
  platform: LoginPlatformType;

  @ApiProperty()
  @IsString()
  accountId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsBoolean()
  verify: boolean;
}
