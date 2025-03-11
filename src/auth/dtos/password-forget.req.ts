import { IsEmail } from 'class-validator';

export class PasswordForgetReq {
  @IsEmail()
  email: string;
}
