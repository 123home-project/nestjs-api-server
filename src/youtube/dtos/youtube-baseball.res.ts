import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserDto } from 'src/user/dtos/user.dto';

export class YoutubeBaseballRes {
  @ApiProperty({ description: '유튜브 id', example: 123 })
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ description: '게시 유저', type: UserDto })
  @ValidateNested()
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @ApiProperty({ description: '유튜브 링크', example: 'https://exmaple.com/profile.png' })
  @IsString()
  @Expose()
  link: string;

  @ApiProperty({ description: '제목', example: '안녕' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: '유튜브 채널명', example: '안녕' })
  @IsString()
  @Expose()
  channelName: string;

  @ApiProperty({ description: '유튜브 섬네일', example: 'https://exmaple.com/profile.png' })
  @IsString()
  @Expose()
  thumbnail: string;

  @ApiProperty({ description: '유튜브 시간', example: '36234621' })
  @IsString()
  @Expose()
  duration: string;

  @ApiProperty({ description: '유튜브 id', example: 'gfsr34efw9g10g3hrw' })
  @IsString()
  @Expose()
  youtubeId: string;

  @ApiProperty({ description: '생성일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2025-04-28 16:51:21.428799' })
  @IsDate()
  @Expose()
  updatedAt: Date;
}
