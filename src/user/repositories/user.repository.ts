import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { LoginPlatformType } from 'src/auth/types/login-platform.type';

@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUserById(userId: number): Promise<User> {
    if (!userId) {
      return null;
    }

    return await this.findOne({
      where: {
        id: userId,
      },
      relations: {
        userAccount: true,
      },
    });
  }

  async getUserByAccountId(accountId: string): Promise<User> {
    return await this.findOne({
      where: {
        userAccount: { accountId: accountId },
      },
      relations: {
        userAccount: true,
      },
    });
  }

  async addUser(user: User): Promise<User> {
    return await this.save(user);
  }

  async getLocalUserByEmail(email: string): Promise<User> {
    return await this.findOne({
      where: {
        email: email,
        userAccount: {
          platform: LoginPlatformType.Normal,
        },
      },
      relations: {
        userAccount: true,
      },
    });
  }

  async updateUserProfile(userId: number, nickname: string, favoriteTeamId: number) {
    const updateElements: any = {};

    if (nickname) {
      updateElements.nickname = nickname;
    }

    if (favoriteTeamId !== undefined) {
      updateElements.favoriteTeam = { id: favoriteTeamId };
    }

    await this.update({ id: userId }, updateElements);
  }

  async softDeleteUser(userId: number) {
    await this.softDelete(userId);
  }
}
