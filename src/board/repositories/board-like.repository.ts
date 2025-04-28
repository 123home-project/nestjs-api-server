import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardLike } from '../entities/board-like.entity';
import { IBoardLikeRepository } from '../interfaces/board-like.repository.interface';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> implements IBoardLikeRepository {
  constructor(private dataSource: DataSource) {
    super(BoardLike, dataSource.createEntityManager());
  }

  async countBoardLikeByBoardId(boardId: number): Promise<number> {
    return this.countBy({ board: { id: boardId } });
  }
}
