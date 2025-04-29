import { Board } from '../entities/board.entity';

export interface IBoardRepository {
  addBoard(board: Board);
  getBoardById(boardId: number): Promise<Board>;
  updateBoard(boardId: number, boardTagId: number, title: string, contents: string);
  softDeleteBoard(boardId: number);
}
