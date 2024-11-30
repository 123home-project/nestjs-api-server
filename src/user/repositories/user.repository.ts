import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserById(userId: number): Promise<User> {
    return await this.findOne({
      where: {
        id: userId,
      },
    });
  }

  async addUser(user: User): Promise<User> {
    return await this.save(user);
  }
}
