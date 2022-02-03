/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt ,Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { userRepository } from './user.repository';
import { User } from './user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(userRepository)
    private userRepository: userRepository
  ) {
    super({
      secretOrKey: 'Secret1234', // 토큰 유효한지 확인할때
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰이 어디서 오는지 확인하는 것
    })
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });
    // 데이터베이스 안에 username이 들어있는지 확인

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}