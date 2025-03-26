import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserAccountRes } from './user-account.res';
import { PredictionMatchRes } from 'src/prediction/dtos/prediction-match.res';
import { PredictionPlayer } from 'src/prediction/entities/prediction_player.entity';
import { RefreshTokenRes } from 'src/auth/dtos/refresh-token.res';

export class UserRes {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  nickname: string;

  @IsString()
  @IsOptional()
  @Expose()
  name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  email?: string;

  @ValidateNested()
  @Type(() => UserAccountRes)
  @IsOptional()
  @Expose()
  userAccount?: UserAccountRes;

  @ValidateNested()
  @Type(() => RefreshTokenRes)
  @IsOptional()
  @Expose()
  refreshToken?: RefreshTokenRes[];

  @ValidateNested()
  @Type(() => PredictionMatchRes)
  @IsOptional()
  @Expose()
  predictionMatch?: PredictionMatchRes[];

  @ValidateNested()
  @Type(() => PredictionPlayer)
  @IsOptional()
  @Expose()
  predictionPlayer?: PredictionPlayer[];

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
