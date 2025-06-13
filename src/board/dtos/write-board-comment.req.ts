import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WriteBoardCommentReq {
  @ApiProperty({ description: '게시판 id', example: 123 })
  @IsNumber()
  boardId: number;

  @ApiPropertyOptional({ description: '태그 유저 id', example: 123 })
  @IsOptional()
  @IsNumber()
  tagUserId?: number;

  @ApiPropertyOptional({ description: '부모 댓글 id', example: 123 })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;

  @ApiProperty({ description: '댓글', example: '안녕' })
  @IsString()
  @MinLength(0)
  @MaxLength(1000)
  comment: string;
}
