import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserRes } from 'src/user/dtos/user.res';
import { BoardRes } from './board.res';

export class BoardLikeRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardRes)
  @IsOptional()
  @Expose()
  board?: BoardRes;

  @ValidateNested()
  @Type(() => UserRes)
  @IsOptional()
  @Expose()
  user?: UserRes;

  @IsNumber()
  @Expose()
  like: number;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;

  @IsDate()
  @Expose()
  deletedAt?: Date;
}
