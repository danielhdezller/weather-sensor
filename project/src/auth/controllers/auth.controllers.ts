import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SingInDto } from '../dto/sing-in.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigInResponseDTO } from '../dto/sing-in-response.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: SigInResponseDTO })
  signIn(@Body() signInDto: SingInDto): Promise<SigInResponseDTO> {
    return this.authService.signIn(signInDto);
  }
}
