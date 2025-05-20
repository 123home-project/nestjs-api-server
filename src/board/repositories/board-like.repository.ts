import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardLike } from '../entities/board-like.entity';
import { IBoardLikeRepository } from '../interfaces/board-like.repository.interface';
import { BoardLikeType } from '../types/board-like.type';

@Injectable()
export class BoardLikeRepository extends Repository<BoardLike> implements IBoardLikeRepository {
  constructor(private dataSource: DataSource) {
    super(BoardLike, dataSource.createEntityManager());
  }

  async countBoardLikeByBoardId(boardId: number, like: BoardLikeType): Promise<number> {
    return this.countBy({ board: { id: boardId }, like });
  }

  async addBoardLike(boardLike: BoardLike): Promise<BoardLike> {
    return await this.save(boardLike);
  }

  async getBoardLikeByBoardIdAndUserId(boardId: number, userId: number): Promise<BoardLike> {
    if (!boardId) {
      return null;
    }

    if (!userId) {
      return null;
    }

    return await this.findOne({ where: { board: { id: boardId }, user: { id: userId } } });
  }

  async deleteBoardLikeById(boardLikeId: number) {
    await this.delete(boardLikeId);
  }
}
