import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { LoginPlatformType } from 'src/auth/types/login-platform.type';
import { UserRes } from './user.res';

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

  @ValidateNested()
  @Type(() => UserRes)
  @IsOptional()
  @Expose()
  user?: UserRes;

  @IsString()
  @Expose()
  createdAt: string;

  @IsString()
  @Expose()
  updatedAt: string;
}
