/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

// service에서 데이터 관련된 것 repository로 가져옴
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>{
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user
    })

    await this.save(board);
    return board;
  }
}