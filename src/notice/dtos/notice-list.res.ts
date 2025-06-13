import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { NoticeType } from '../types/notice.type';
import { ApiProperty } from '@nestjs/swagger';

export class NoticeListRes {
  @ApiProperty({ description: '공지사항 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '제목', example: '안녕' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: '공지사항 타입', example: 'notice', enum: NoticeType })
  @IsEnum(NoticeType)
  @Expose()
  noticeType: NoticeType;

  @ApiProperty({ description: '생성일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
