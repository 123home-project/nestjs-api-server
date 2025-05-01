import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class RefreshTokenRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @IsOptional()
  @Expose()
  user?: UserDto;

  @IsString()
  @Expose()
  token: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
