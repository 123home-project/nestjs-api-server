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

  async getBoardCommentById(boardCommentId: number): Promise<BoardComment> {
    if (!boardCommentId) {
      return null;
    }

    return this.findOne({
      where: { id: boardCommentId },
      relations: { parentComment: true, user: true, tagUser: true },
    });
  }

  async addBoardComment(boardComment: BoardComment): Promise<BoardComment> {
    return this.save(boardComment);
  }

  async updateBoardComment(boardCommentId: number, tagUserId: number, comment: string) {
    const updateElements: any = {};

    if (tagUserId !== undefined) {
      updateElements.tagUser = { id: tagUserId };
    }

    if (comment) {
      updateElements.comment = comment;
    }

    await this.update({ id: boardCommentId }, updateElements);
  }
}
