import { IsEnum, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BoardType } from '../types/board.type';

export class WriteBoardReq {
  @ApiProperty({ description: '게시판 태그 id', example: 123 })
  @IsNumber()
  boardTagId: number;

  @ApiProperty({ description: '제목', example: '안녕' })
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: '내용', example: '안녕' })
  @IsString()
  @MinLength(0)
  contents: string;

  @ApiPropertyOptional({ description: '게시판 타입', default: 'free', example: 'free', enum: BoardType })
  @IsEnum(BoardType)
  boardType: BoardType = 'free';
}
