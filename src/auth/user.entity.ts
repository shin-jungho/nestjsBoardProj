/* eslint-disable prettier/prettier */
import { Board } from 'src/boards/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Board, board => board.user, { eager: true }) // eager: true는 유저 가지고 올때 게시물도 가져올 수 있게 하기위해서 
  boards: Board[]
}