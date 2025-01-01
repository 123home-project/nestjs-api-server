import { IsNumber } from 'class-validator';

export class jwtAccessTokenDto {
  @IsNumber()
  userId: number;
}
