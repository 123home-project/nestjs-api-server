import { BoardComment } from '../entities/board-comment.entity';

export interface IBoardCommentRepository {
  countBoardCommentByBoardId(boardId: number): Promise<number>;
  getBoardCommentById(boardCommentId: number): Promise<BoardComment>;
  addBoardComment(boardComment: BoardComment): Promise<BoardComment>;
  updateBoardComment(boardCommentId: number, tagUserId: number, comment: string);
  softDeleteBoardComment(boardCommentId: number);
  getBoardCommentByBoardId(boardId: number): Promise<BoardComment[]>;
}
