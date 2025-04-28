import { BoardTag } from '../entities/board-tag.entity';

export interface IBoardTagRepository {
  getBoardTagById(boardTagId: number): Promise<BoardTag>;
}
