import { IsOptional, IsString } from 'class-validator';

export class PlayerRankingProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  profile?: string;

  @IsString()
  stat: string;
}
