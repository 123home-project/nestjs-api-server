import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class HitterFirstTeamRes {
  @ApiProperty({ description: '타자 id', example: 123 })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '선수 명', example: '안녕' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 이미지', example: 'https://example.com/profile.png' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '팀 id', example: 123 })
  @IsNumber()
  @Expose()
  teamId: number;

  @ApiProperty({ description: '팀 명', example: '안녕' })
  @IsString()
  @Expose()
  teamName: string;

  @ApiProperty({ description: '팀 로고', example: 'https://example.com/profile.png' })
  @IsString()
  @Expose()
  teamLogo: string;
}
