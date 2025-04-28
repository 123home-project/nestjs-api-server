import { JwtAccessTokenReq } from 'src/auth/dtos/jwt-access-token.req';
import { WriteBoardReq } from '../dtos/write-board.req';
import { UpdateBoardReq } from '../dtos/update-board.req';

export interface IBoardService {
  writeBoard(accessTokenUser: JwtAccessTokenReq, writeBoardReq: WriteBoardReq);
  updateBoard(accessTokenUser: JwtAccessTokenReq, updateBoard: UpdateBoardReq);
}
