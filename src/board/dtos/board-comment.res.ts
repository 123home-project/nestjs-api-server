import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserRes } from 'src/user/dtos/user.res';
import { BoardRes } from './board.res';

export class BoardCommentRes {
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

  @ValidateNested()
  @Type(() => BoardCommentRes)
  @IsOptional()
  @Expose()
  parentComment: BoardCommentRes;

  @ValidateNested()
  @Type(() => BoardCommentRes)
  @IsOptional()
  @Expose()
  reply: BoardCommentRes[];

  @IsString()
  @Expose()
  comment: string;

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
