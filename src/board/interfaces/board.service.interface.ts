import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { WriteBoardReq } from '../dtos/write-board.req';
import { UpdateBoardReq } from '../dtos/update-board.req';
import { WriteBoardCommentReq } from '../dtos/write-board-comment.req';

export interface IBoardService {
  writeBoard(accessTokenUser: JwtAccessTokenReq, writeBoardReq: WriteBoardReq);
  updateBoard(accessTokenUser: JwtAccessTokenReq, updateBoard: UpdateBoardReq, boardId: number);
  deleteBoard(accessTokenUser: JwtAccessTokenReq, boardId: number);
  writeBoardComment(accessTokenUser: JwtAccessTokenReq, writeBoardCommentReq: WriteBoardCommentReq);
}
