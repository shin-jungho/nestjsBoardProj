/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule // auth modules를 import한 뒤에 controller로 넘어가서 인증된 유저만 게시물 보고 쓰게 함
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
