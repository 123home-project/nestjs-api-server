import { IsDate, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReportReplyRes {
  @ApiProperty({ description: '신고 답변 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '내용', example: '안녕' })
  @IsString()
  @Expose()
  contents: string;

  @ApiProperty({ description: '생성일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
