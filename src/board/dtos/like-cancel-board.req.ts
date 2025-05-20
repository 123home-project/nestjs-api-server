import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeCancelBoardReq {
  @ApiProperty({ description: '게시판 id' })
  @IsNumber()
  boardId: number;
}
