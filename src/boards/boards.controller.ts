/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity'; // 
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(
      @getUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }


  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto,
  @getUser() user: User): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload: ${JSON.stringify(createBoardDto)}`)
    return this.boardsService.createBoard(createBoardDto, user);
  }
  
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
      return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @getUser() user: User
    ): Promise<void> {
      return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
      return this.boardsService.updateBoardStatus(id, status);
    }


}

// 로컬 스토리지 사용시 만든 router
// @Get('/')
// getAllBoard(): Board[] {
//   return this.boardsService.getAllBoards();
// }
// @Post()
// @UsePipes(ValidationPipe) // controller handler에 만들어서 유효성 체크
// createBoard(
//   @Body() createBoardDto: CreateBoardDto
//   ): Board {
//   return this.boardsService.createBoard(createBoardDto);
// }
// 고유한 id로 게시물 가져오는 것으로 @body가 아니라 @param으로 함
// @Get('/:id')
// getBoardById(@Param('id') id: string): Board{
//   return this.boardsService.getBoardById(id);
// }
// @Delete('/:id')
// deleteBoard(@Param('id') id: string): void {
//   this.boardsService.deleteBoard(id);
// }
// @Patch('/:id/status')
// updateBoardStatus(
//   @Param('id') id: string,
//   @Body('status', BoardStatusValidationPipe) status: BoardStatus
//   ) {
//     return this.boardsService.updateBoardStatus(id, status);
//   }