import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { WriteBoardReq } from '../dtos/write-board.req';
import { UpdateBoardReq } from '../dtos/update-board.req';
import { WriteBoardCommentReq } from '../dtos/write-board-comment.req';
import { UpdateBoardCommentReq } from '../dtos/update-board-comment.req';
import { LikeBoardReq } from '../dtos/like-board.req';
import { LikeCancelBoardReq } from '../dtos/like-cancel-board.req';
import { BoardListReq } from '../dtos/board-list.req';
import { BoardListRes } from '../dtos/board-list.res';
import { BoardTagReq } from '../dtos/board-tag.req';
import { BoardTagRes } from '../dtos/board-tag.res';

export interface IBoardService {
  writeBoard(accessTokenUser: JwtAccessTokenReq, writeBoardReq: WriteBoardReq);
  updateBoard(accessTokenUser: JwtAccessTokenReq, updateBoard: UpdateBoardReq, boardId: number);
  deleteBoard(accessTokenUser: JwtAccessTokenReq, boardId: number);
  writeBoardComment(accessTokenUser: JwtAccessTokenReq, writeBoardCommentReq: WriteBoardCommentReq);
  updateBoardComment(
    accessTokenUser: JwtAccessTokenReq,
    updateBoardCommentReq: UpdateBoardCommentReq,
    boardCommentId: number,
  );
  deleteBoardComment(accessTokenUser: JwtAccessTokenReq, boardCommentId: number);
  likeBoard(accessTokenUser: JwtAccessTokenReq, likeBoardReq: LikeBoardReq);
  likeCancelBoard(accessTokenUser: JwtAccessTokenReq, likeCancelBoardReq: LikeCancelBoardReq);
  getBoardList(boardListReq: BoardListReq): Promise<BoardListRes[]>;
  getBoardTag(boardTagReq: BoardTagReq): Promise<BoardTagRes[]>;
}
