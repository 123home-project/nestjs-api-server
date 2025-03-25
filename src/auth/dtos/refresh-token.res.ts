import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserRes } from 'src/user/dtos/user.res';

export class RefreshTokenRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserRes)
  @IsOptional()
  @Expose()
  user?: UserRes;

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
