import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PasswordResetReq {
  @ApiProperty({ description: '이메일 인증 코드', example: 'ef320g43g34g' })
  @IsString()
  emailAuthCode: string;

  @ApiProperty({ description: '변경하려는 비밀번호', example: '12345678' })
  @IsString()
  password: string;
}
