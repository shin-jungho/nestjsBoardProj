/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';
import { authCredentialDto } from './dto/authCredential.dto';

@EntityRepository(User)
export class userRepository extends Repository<User> {
  async createUser(authCredentialDto: authCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password })
    
    // 위 코드와 같은 것
    // const user = new User();
    // user.username = username;
    // user.password = password;
    
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == '23505') { // console 찍었을때 나왔던 errorcode
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}