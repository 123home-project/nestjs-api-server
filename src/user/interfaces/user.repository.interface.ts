import { User } from '../entities/user.entity';

export interface IUserRepository {
  getUserById(userId: number): Promise<User>;
  getUserByAccountId(accountId: string): Promise<User>;
  addUser(user: User);
  getLocalUserByEmail(email: string): Promise<User>;
  updateUserProfile(userId: number, nickname: string, favoriteTeamId: number);
  softDeleteUser(userId: number);
}
