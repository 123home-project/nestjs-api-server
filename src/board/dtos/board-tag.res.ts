import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BoardTagRes {
  @ApiProperty({ description: '게시판 태그 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '태그 명', example: '안녕' })
  @IsString()
  @Expose()
  name: string;
}
