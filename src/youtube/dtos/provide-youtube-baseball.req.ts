import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProvideYoutubeBaseballReq {
  @ApiProperty({ description: '제보한 유튜브 링크' })
  @IsString()
  link: string;
}
