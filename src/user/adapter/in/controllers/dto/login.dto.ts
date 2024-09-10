import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { SignUpPlatformType } from '../../../../type/SignUpPlatformType';
import { Type } from 'class-transformer';

export class NormalLoginDto {
  @IsString()
  id: string;

  @IsString()
  pw: string;
}
export class LoginDto {
  @IsEnum(SignUpPlatformType)
  platform: SignUpPlatformType;

  // @ValidateNested()
  // @Type((dto) => {
  //   if (dto.object.platform === 'Normal') {
  //     return NormalLoginDto;
  //   }
  // })
  // data: NormalLoginDto;
  id: string;
  pw: string;
}
