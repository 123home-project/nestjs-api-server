export interface IBoardCommentRepository {
  countBoardCommentByBoardId(boardId: number): Promise<number>;
}
