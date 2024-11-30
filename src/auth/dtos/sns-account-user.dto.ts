import { LoginPlatformType } from '../types/LoginPlatformType';

export class snsAccountUserDto {
  platform: LoginPlatformType;
  accountId: string;
  name: string;
  email?: string;
}
