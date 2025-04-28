import { Board } from '../entities/board.entity';

export interface IBoardRepository {
  addBoard(board: Board);
}
