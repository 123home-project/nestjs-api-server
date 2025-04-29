import { BoardLike } from '../entities/board-like.entity';

export interface IBoardLikeRepository {
  countBoardLikeByBoardId(boardId: number): Promise<number>;
  addBoardLike(boardLike: BoardLike): Promise<BoardLike>;
  getBoardLikeByBoardIdAndUserId(boardId: number, userId: number): Promise<BoardLike>;
  deleteBoardLikeById(boardLikeId: number);
}
