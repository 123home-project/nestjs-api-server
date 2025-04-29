import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeBoardReq {
  @ApiProperty({ description: '게시판 태그 id' })
  @IsNumber()
  boardId: number;

  @ApiProperty({ description: '좋아요: 1 / 싫어요: -1', default: 1 })
  @IsNumber()
  @Min(-1)
  @Max(1)
  like: number = 1;
}
