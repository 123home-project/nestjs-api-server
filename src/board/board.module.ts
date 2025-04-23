import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardComment } from './entities/board-comment.entity';
import { BoardLike } from './entities/board-like.entity';
import { BoardTag } from './entities/board-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardComment, BoardLike, BoardTag])],
  controllers: [],
  providers: [],
})
export class BoardModule {}
