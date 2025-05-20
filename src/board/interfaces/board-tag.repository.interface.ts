import { BoardTag } from '../entities/board-tag.entity';
import { BoardType } from '../types/board.type';

export interface IBoardTagRepository {
  getBoardTagById(boardTagId: number): Promise<BoardTag>;
  getBoardTagByBoardType(boardType: BoardType): Promise<BoardTag[]>;
}
