import { IsEmail, IsString } from 'class-validator';

export class LocalRegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
