import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamRes {
  @ApiProperty({ description: '팀 id' })
  @Expose()
  id: number;

  @ApiProperty({ description: '팀 로고' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '팀 명' })
  @Expose()
  name: string;
}
