import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardComment } from './entities/board-comment.entity';
import { BoardLike } from './entities/board-like.entity';
import { BoardTag } from './entities/board-tag.entity';
import { BoardService } from './services/board.service';
import { UserModule } from 'src/user/user.module';
import { BoardRepository } from './repositories/board.repository';
import { BoardController } from './controllers/board.controller';
import { BoardTagRepository } from './repositories/board-tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardComment, BoardLike, BoardTag]), UserModule],
  controllers: [BoardController],
  providers: [
    { provide: 'IBoardService', useClass: BoardService },
    { provide: 'IBoardRepository', useClass: BoardRepository },
    { provide: 'IBoardTagRepository', useClass: BoardTagRepository },
  ],
})
export class BoardModule {}
