import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { LoginPlatformType } from 'src/auth/types/login-platform.type';

export class UserAccountRes {
  @IsNumber()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  accountId: string;

  @IsString()
  @IsOptional()
  @Expose()
  password?: string;

  @IsEnum(LoginPlatformType)
  @Expose()
  platform: LoginPlatformType;

  @IsBoolean()
  @Expose()
  verify: boolean;

  @IsString()
  @Expose()
  createdAt: string;

  @IsString()
  @Expose()
  updatedAt: string;
}
