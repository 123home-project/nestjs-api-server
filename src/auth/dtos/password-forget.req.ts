import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class PasswordForgetReq {
  @ApiProperty({ description: '찾으려는 비밀번호의 계정 id email' })
  @IsEmail()
  email: string;
}
