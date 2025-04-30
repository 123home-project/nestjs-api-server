import { Board } from '../entities/board.entity';
import { BoardFiterType } from '../types/board-filter.type';
import { BoardType } from '../types/board.type';

export interface IBoardRepository {
  addBoard(board: Board);
  getBoardById(boardId: number): Promise<Board>;
  updateBoard(boardId: number, boardTagId: number, title: string, contents: string);
  softDeleteBoard(boardId: number);
  getBoards(
    boardFilterType: BoardFiterType,
    boardTagId: number,
    keyword: string,
    boardType: BoardType,
    offset: number,
    limit: number,
  ): Promise<Board[]>;
}
