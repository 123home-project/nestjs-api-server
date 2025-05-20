import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { BoardUserRes } from './board-user.res';

export class BoardCommentRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardUserRes)
  @Expose()
  user: BoardUserRes;

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
}
