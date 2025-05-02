import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class YoutubeBaseballRes {
  @IsNumber()
  @Expose()
  id: number;

  @ValidateNested()
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @IsString()
  @Expose()
  link: string;

  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  channelName: string;

  @IsString()
  @Expose()
  thumbnail: string;

  @IsString()
  @Expose()
  duration: string;

  @IsString()
  @Expose()
  youtubeId: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;
}
