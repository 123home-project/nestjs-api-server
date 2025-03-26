import { Expose, Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { GameResultType } from 'src/team/types/game-result.type';
import { TeamScheduleRes } from 'src/team/dtos/team-schedule.res';
import { UserRes } from 'src/user/dtos/user.res';

export class PredictionMatchRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserRes)
  @Expose()
  user: UserRes;

  @ValidateNested()
  @Type(() => TeamScheduleRes)
  @IsOptional()
  @Expose()
  teamSchedule?: TeamScheduleRes;

  @IsEnum(GameResultType)
  @Expose()
  prediction: GameResultType;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
