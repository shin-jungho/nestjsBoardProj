/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { userRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([userRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // jwtstrategy를 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
