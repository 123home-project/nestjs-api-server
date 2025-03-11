import { IsString } from 'class-validator';

export class PasswordResetReq {
  @IsString()
  emailAuthCode: string;

  @IsString()
  password: string;
}
