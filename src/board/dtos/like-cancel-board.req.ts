import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeCancelBoardReq {
  @ApiProperty({ description: '게시판 id', example: 123 })
  @IsNumber()
  boardId: number;
}
