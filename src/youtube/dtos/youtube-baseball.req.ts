import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class YoutubeBaseballReq {
  @ApiPropertyOptional({ description: '보여줄 개수', default: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 100;

  @ApiPropertyOptional({ description: '시작 번호', default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset?: number = 0;

  @ApiPropertyOptional({ description: '닉네임 검색' })
  @IsString()
  @IsOptional()
  keyword?: string;
}
