/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialDto } from './dto/authCredential.dto';
import { userRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userRepository)
    private userRepository: userRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialDto: authCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: authCredentialDto): Promise<{accessToken}> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username });

    if(user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret, payload(중요한 정보는 넣지 말기) 필요)
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
