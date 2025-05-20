import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IRefreshTokenRepository } from '../interfaces/refresh-token.repository.interface';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> implements IRefreshTokenRepository {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  async addRefreshToken(refreshToken: RefreshToken) {
    await this.save(refreshToken);
  }
}
