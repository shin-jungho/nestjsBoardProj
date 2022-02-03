/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(
    user: User
  ): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id})

    const boards = await query.getMany();

    return boards;
  }
  // private boards: Board[] = []; // 로컬 메모리이므로 실제 데이터랑 연동하기 위해 주석처리
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }
    
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto; // Dto 적용
  //   // uuid 모듈 사용해서 id를 유니크한 값으로 생성
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

    async getBoardById(id: number): Promise<Board> {
      const found = await this.boardRepository.findOne(id);

      if(!found) {
        throw new NotFoundException(`can't find id ${id}`);
      }
      return found;
    }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   // 찾는 아이디가 없을때 if문에 NotFoundException으로 없다고 알려줌
  //   if(!found) {
  //     throw new NotFoundException(`Can't find id ${id}` );
  //   }
  //   return found;
  // }

    async deleteBoard(id: number): Promise<void> {
      const result = await this.boardRepository.delete(id);

      if(result.affected === 0) {
        throw new NotFoundException(`can't find id${id}`);
      }
      console.log('result:', result);
      
    }
  // // 아이디가 다른것을 필터링하고 아이디가 같은것만 지우도록하는 delete 함수
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((boards) => boards.id !== found.id);
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status
    await this.boardRepository.save(board);
    return board;
  }
    
  // // status는 private인지 public 인지 알기 위해서 사용
  // // 업데이트 하고싶은 게시물 아이디를 id에 넣어주면 업데이트 하고자하는 정보를 board에 넣고 
  // // 업데이트된 status값까지 넣어서 board에 리턴시키면 됨
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
