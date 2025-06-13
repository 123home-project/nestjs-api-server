import { IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { BoardType } from '../types/board.type';
import { Expose, Type } from 'class-transformer';
import { BoardTagRes } from './board-tag.res';
import { BoardUserRes } from './board-user.res';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BoardListRes {
  @ApiProperty({ description: '게시판 아이디', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiPropertyOptional({ description: '게시판 작성 유저', type: BoardUserRes })
  @ValidateNested()
  @Type(() => BoardUserRes)
  @IsOptional()
  @Expose()
  user?: BoardUserRes;

  @ApiPropertyOptional({ description: '게시판 태그', type: BoardTagRes })
  @ValidateNested()
  @Type(() => BoardTagRes)
  @IsOptional()
  @Expose()
  boardTag?: BoardTagRes;

  @ApiProperty({ description: '제목', example: '안녕' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: '내용', example: '안녕' })
  @IsString()
  @Expose()
  contents: string;

  @ApiProperty({ description: '조회수', example: 12321 })
  @IsNumber()
  @Expose()
  views: number;

  @ApiProperty({ description: '게시판 타입', example: 'free', enum: BoardType })
  @IsEnum(BoardType)
  @Expose()
  boardTypes: BoardType;

  @ApiProperty({ description: '게시판 댓글 수', example: 123 })
  @IsNumber()
  @Expose()
  boardCommentCount: number;

  @ApiProperty({ description: '게시판 좋아요 수', example: 123 })
  @IsNumber()
  @Expose()
  boardLikeCount: number;

  @ApiProperty({ description: '생성일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
