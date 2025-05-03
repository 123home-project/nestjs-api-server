import { IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { NoticeType } from '../types/notice.type';

export class NoticeListReq {
  @ApiPropertyOptional({ description: '검색 키워드' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  keyword?: string;

  @ApiPropertyOptional({ description: '게시판 타입', default: 'notice' })
  @IsOptional()
  @IsEnum(NoticeType)
  noticeType: NoticeType = 'notice';

  @ApiPropertyOptional({ description: '보여줄 개수', default: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 100;

  @ApiPropertyOptional({ description: '시작 번호', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;
}
