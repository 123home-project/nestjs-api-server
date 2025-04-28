export interface IBoardLikeRepository {
  countBoardLikeByBoardId(boardId: number): Promise<number>;
}
