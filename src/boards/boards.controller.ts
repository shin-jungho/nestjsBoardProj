/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity'; // 

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Post()
  // @UsePipes(ValidationPipe) // controller hander에 만들어서 유효성 체크
  // createBoard(
  //   @Body() createBoardDto: CreateBoardDto
  //   ): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
      return this.boardsService.getBoardById(id);
    }

  // // 고유한 id로 게시물 가져오는 것으로 @body가 아니라 @param으로 함
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board{
  //   return this.boardsService.getBoardById(id);
  // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
      return this.boardsService.deleteBoard(id);
    }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

    @Patch('/:id/status')
    updateBoardStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
      return this.boardsService.updateBoardStatus(id, status);
    }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  //   ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
