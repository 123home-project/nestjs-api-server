import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LocalRegisterReq {
  @ApiProperty({ description: '로그인 id email', example: 'abc@123home.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호', example: '12345678' })
  @IsString()
  password: string;
}
