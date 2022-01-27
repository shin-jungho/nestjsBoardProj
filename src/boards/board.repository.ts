/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

// service에서 데이터 관련된 것 repository로 가져옴
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
    const { title, description } = createBoardDto;

    const board = this.create({ //await??
      title,
      description,
      status: BoardStatus.PUBLIC,
    })

    await this.save(board);
    return board;
  }
}