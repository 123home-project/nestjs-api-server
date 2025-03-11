import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PasswordResetReq {
  @ApiProperty({ description: '이메일 인증 코드' })
  @IsString()
  emailAuthCode: string;

  @ApiProperty({ description: '변경하려는 비밀번호' })
  @IsString()
  password: string;
}
