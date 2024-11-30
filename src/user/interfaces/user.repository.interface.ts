import { User } from '../entities/user.entity';

export interface IUserRepository {
  getUserById(userId: number): Promise<User>;
  addUser(user: User);
}
