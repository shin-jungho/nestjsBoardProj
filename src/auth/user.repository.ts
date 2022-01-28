/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { authCredentialDto } from './dto/authCredential.dto';
import { User } from './auth.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class userRepository extends Repository<User> {
  async createUser(authCredentialDto: authCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    
    // 위 코드와 같은 것
    // const user = new User();
    // user.username = username;
    // user.password = password;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword })
    
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