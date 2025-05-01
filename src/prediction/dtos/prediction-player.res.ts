import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';
import { TeamScheduleHitterRes } from 'src/team/dtos/team-schedule-hitter.res';
import { TeamSchedulePitcherRes } from 'src/team/dtos/team-schedule-pitcher.res';

export class PredictionPlayerRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

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
