/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

@EntityRepository(Board)
export class BoardREpository extends Repository<Board> {
  
}