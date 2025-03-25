import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UserRes } from 'src/user/dtos/user.res';
import { TeamScheduleHitterRes } from 'src/team/dtos/team-schedule-hitter.res';
import { TeamSchedulePitcherRes } from 'src/team/dtos/team-schedule-pitcher.res';

export class PredictionPlayerRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserRes)
  @Expose()
  user: UserRes;

  @ValidateNested()
  @Type(() => TeamScheduleHitterRes)
  @IsOptional()
  @Expose()
  teamScheduleHitter?: TeamScheduleHitterRes;

  @ValidateNested()
  @Type(() => TeamSchedulePitcherRes)
  @IsOptional()
  @Expose()
  teamSchedulePitcher?: TeamSchedulePitcherRes;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
