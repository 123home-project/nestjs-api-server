import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { SnsSignUpPlatformType } from '../../../../type/SnsSignUpPlatformType';
import { Type } from 'class-transformer';

export class GoogleSignUpDto {
  @IsString()
  id!: string;

  @IsString()
  pw!: string;
}

export class SnsSignUpDto {
  @IsEnum(SnsSignUpPlatformType)
  platform: SnsSignUpPlatformType;

  @ValidateNested()
  @Type(() => {
    return GoogleSignUpDto;
  })
  snsSignUpDto!: GoogleSignUpDto;
}
