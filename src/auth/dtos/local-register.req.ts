import { IsEmail, IsString } from 'class-validator';

export class LocalRegisterReq {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
