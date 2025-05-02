import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TeamDto } from './team.dto';

export class TeamHistoryRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => TeamDto)
  @IsOptional()
  @Expose()
  team?: TeamDto;

  @IsNumber()
  @Expose()
  year: number;

  @IsString()
  @Expose()
  logo: string;

  @IsNumber()
  @Expose()
  ranking: number;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
