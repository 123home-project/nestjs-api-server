import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class HitterFirstTeamRes {
  @ApiProperty({ description: '타자 id' })
  @IsNumber()
  @Expose()
  hitterStatId: number;

  @ApiProperty({ description: '선수 명' })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({ description: '선수 이미지' })
  @IsString()
  @Expose()
  profile: string;

  @ApiProperty({ description: '팀 id' })
  @IsNumber()
  @Expose()
  teamId: number;

  @ApiProperty({ description: '팀 명' })
  @IsString()
  @Expose()
  teamName: string;

  @ApiProperty({ description: '팀 로고' })
  @IsString()
  @Expose()
  teamLogo: string;
}
