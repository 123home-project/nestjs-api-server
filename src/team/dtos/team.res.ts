import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamRes {
  @ApiProperty({ description: '팀 id', example: 123 })
  @Expose()
  id: number;

  @ApiProperty({ description: '팀 로고', example: 'https://example.com/profile.png' })
  @Expose()
  logo: string;

  @ApiProperty({ description: '팀 명', example: '안녕' })
  @Expose()
  name: string;
}
