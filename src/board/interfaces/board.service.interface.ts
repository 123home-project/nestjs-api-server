import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { WriteBoardReq } from '../dtos/write-board.req';
import { UpdateBoardReq } from '../dtos/update-board.req';
import { WriteBoardCommentReq } from '../dtos/write-board-comment.req';
import { UpdateBoardCommentReq } from '../dtos/update-board-comment.req';
import { LikeBoardReq } from '../dtos/like-board.req';
import { LikeCancelBoardReq } from '../dtos/like-cancel-board.req';

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
}
