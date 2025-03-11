import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LocalRegisterReq {
  @ApiProperty({ description: '로그인 id email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;
}
