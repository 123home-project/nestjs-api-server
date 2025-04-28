import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardComment } from '../entities/board-comment.entity';
import { IBoardCommentRepository } from '../interfaces/board-comment.repository.interface';

@Injectable()
export class BoardCommentRepository extends Repository<BoardComment> implements IBoardCommentRepository {
  constructor(private dataSource: DataSource) {
    super(BoardComment, dataSource.createEntityManager());
  }

  async countBoardCommentByBoardId(boardId: number): Promise<number> {
    return this.countBy({ board: { id: boardId } });
  }
}
