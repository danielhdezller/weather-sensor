import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('---> process.env.JWT_SECRET:', process.env.JWT_SECRET); //LOG: process.env.JWT_SECRET
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
