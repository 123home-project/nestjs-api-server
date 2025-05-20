import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WriteBoardCommentReq {
  @ApiProperty({ description: '게시판 id' })
  @IsNumber()
  boardId: number;

  @ApiPropertyOptional({ description: '태그 유저 id' })
  @IsOptional()
  @IsNumber()
  tagUserId?: number;

  @ApiPropertyOptional({ description: '부모 댓글 id' })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;

  @ApiProperty({ description: '댓글' })
  @IsString()
  @MinLength(0)
  @MaxLength(1000)
  comment: string;
}
