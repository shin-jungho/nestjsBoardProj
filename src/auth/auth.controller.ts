/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialDto } from './dto/authCredential.dto';

@Controller('auth')
export class AuthController {
  constructor( 
    private authService: AuthService
  ) {}

    // localhost:3000/auth/signup
  @Post('/signup')
    signUp(@Body() authCredentialDto: authCredentialDto): Promise<void> {
      return this.authService.signUp(authCredentialDto);
    }
}
