/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialDto } from './dto/authCredential.dto';
import { userRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userRepository)
    private userRepository: userRepository
  ) {}

  async signUp(authCredentialDto: authCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
