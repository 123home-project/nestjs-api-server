import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamScoreRes {
  @ApiProperty({ description: '팀 id' })
  @Expose()
  teamId: number;

  @ApiProperty({ description: '팀 로고' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '팀 명' })
  @Expose()
  name: string;

  @ApiProperty({ description: '점수' })
  @Expose()
  score: number;
}
