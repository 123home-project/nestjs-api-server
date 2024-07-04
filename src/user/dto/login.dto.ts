import { IsEnum } from 'class-validator';
import { SignUpPlatformType } from '../type/SignUpPlatformType';

export class LoginDto {
  @IsEnum(SignUpPlatformType)
  platform: SignUpPlatformType;
}
