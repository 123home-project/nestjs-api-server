import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { IBoardRepository } from '../interfaces/board.repository.interface';

@Injectable()
export class BoardRepository extends Repository<Board> implements IBoardRepository {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async addBoard(board: Board) {
    await this.save(board);
  }
}
