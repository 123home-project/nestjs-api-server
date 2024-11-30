import { snsAccountUserDto } from 'src/auth/dtos/sns-account-user.dto';
import { UserAccount } from 'src/user/entities/user-account.entity';
import { User } from 'src/user/entities/user.entity';

export interface IAuthService {
  snsLogin(snsAccountUser: snsAccountUserDto);
  verifyValidateUserBySnsAcccountUser(snsAccountUser: snsAccountUserDto);
  getAuthToken(userAccount: UserAccount);
  addRefreshToken(accessToken: string, user: User);
}
