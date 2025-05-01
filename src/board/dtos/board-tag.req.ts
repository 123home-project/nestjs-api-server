import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardType } from '../types/board.type';

export class BoardTagReq {
  @ApiPropertyOptional({ description: '게시판 타입', default: 'free' })
  @IsOptional()
  @IsEnum(BoardType)
  boardType: BoardType = 'free';
}
