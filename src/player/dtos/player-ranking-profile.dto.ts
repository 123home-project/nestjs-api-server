import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlayerRankingProfileDto {
  @ApiProperty({ description: '선수명' })
  @IsString()
  name: string;

  @ApiProperty({ description: '선수 프로필 이미지' })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiProperty({ description: '선수 스탯' })
  @IsString()
  stat: string;
}
