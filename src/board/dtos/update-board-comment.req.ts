import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBoardCommentReq {
  @ApiPropertyOptional({ description: '태그 유저 id' })
  @IsOptional()
  @IsNumber()
  tagUserId?: number;

  @ApiPropertyOptional({ description: '댓글' })
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  comment?: string;
}
