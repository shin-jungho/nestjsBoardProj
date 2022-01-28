/* eslint-disable prettier/prettier */
import { Entity, Repository } from 'typeorm';
import { User } from './auth.entity';

@Entity()
export class userRepository extends Repository<User> {

}