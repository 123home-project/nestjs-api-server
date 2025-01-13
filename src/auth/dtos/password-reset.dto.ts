import { IsString } from 'class-validator';

export class PasswordResetDto {
  @IsString()
  emailAuthCode: string;

  @IsString()
  password: string;
}
