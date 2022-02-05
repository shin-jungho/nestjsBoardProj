/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { authCredentialDto } from './dto/authCredential.dto';
import { getUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor( 
    private authService: AuthService
  ) {}

    // localhost:3000/auth/signup
  @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: authCredentialDto): Promise<void> {
      return this.authService.signUp(authCredentialDto);
    }

  @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: authCredentialDto): Promise<{ accessToken: string }> {
      return this.authService.signIn(authCredentialDto);
    }
    
    @Post('/test')
    @UseGuards(AuthGuard()) 
    test(@getUser() user: User) {
      console.log('user', User);
      
    }
  }