import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class YoutubeBaseballDto {
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
  link: string;

  @IsString()
  @IsOptional()
  @Expose()
  title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  channelName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  @Expose()
  duration?: string;

  @IsString()
  @IsOptional()
  @Expose()
  youtubeId?: string;

  @IsBoolean()
  @Expose()
  permission: boolean;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
