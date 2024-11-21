import { LoginPlatformType } from '../type/LoginPlatformType';

export class snsAccountUserDto {
  platform: LoginPlatformType;
  accountId: string;
  name: string;
  email?: string;
}
