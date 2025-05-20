import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthTokenRes {
  @ApiProperty({ description: '리프레쉬 토큰' })
  @IsString()
  @Expose()
  refreshToken: string;

  @ApiProperty({ description: '엑세스 토큰' })
  @IsString()
  @Expose()
  accessToken: string;
}
