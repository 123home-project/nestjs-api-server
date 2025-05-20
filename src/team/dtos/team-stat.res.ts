import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { TeamDto } from './team.dto';

export class TeamStatRes {
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

  @IsNumber()
  @Expose()
  win: number;

  @IsNumber()
  @Expose()
  draw: number;

  @IsNumber()
  @Expose()
  lose: number;

  @IsNumber()
  @Expose()
  winRate: number;

  @IsNumber()
  @Expose()
  avg: number;

  @IsNumber()
  @Expose()
  era: number;

  @IsNumber()
  @Expose()
  ops: number;

  @IsNumber()
  @Expose()
  strikeOut: number;

  @IsNumber()
  @Expose()
  homerun: number;

  @IsNumber()
  @Expose()
  sb: number;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
