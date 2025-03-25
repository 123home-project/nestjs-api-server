import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TeamRes } from './team.res';

export class TeamHistoryRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => TeamRes)
  @IsOptional()
  @Expose()
  team?: TeamRes;

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
