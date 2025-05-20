import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';
import { BoardDto } from './board.dto';

export class BoardCommentDto {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => BoardDto)
  @IsOptional()
  @Expose()
  board?: BoardDto;

  @ValidateNested()
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user?: UserDto;

  @ValidateNested()
  @Type(() => BoardCommentDto)
  @IsOptional()
  @Expose()
  parentComment: BoardCommentDto;

  @ValidateNested()
  @Type(() => BoardCommentDto)
  @IsOptional()
  @Expose()
  reply: BoardCommentDto[];

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
