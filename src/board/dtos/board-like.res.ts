import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';
import { BoardDto } from './board.dto';

export class BoardLikeRes {
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
