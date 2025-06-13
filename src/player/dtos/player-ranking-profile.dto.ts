import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PlayerRankingProfileDto {
  @ApiProperty({ description: '선수명', example: '안녕' })
  @IsString()
  name: string;

  @ApiProperty({ description: '선수 프로필 이미지', example: 'https://example.com/profile.png' })
  @IsString()
  @IsOptional()
  profile?: string;

  @ApiProperty({ description: '선수 스탯', example: '4.32' })
  @IsString()
  stat: string;
}
