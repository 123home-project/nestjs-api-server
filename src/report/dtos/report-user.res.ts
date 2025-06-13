import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ReportUserRes {
  @ApiProperty({ description: '신고 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '닉네임', example: '안녕' })
  @IsString()
  @Expose()
  nickname: string;
}
