import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBoardReq {
  @ApiPropertyOptional({ description: '게시판 태그 id' })
  @IsOptional()
  @IsNumber()
  boardTagId?: number;

  @ApiPropertyOptional({ description: '제목' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ description: '내용' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  contents?: string;
}
