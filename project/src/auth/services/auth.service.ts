import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { SingInDto } from '../dto/sing-in.dto';
import { SigInResponseDTO } from '../dto/sing-in-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SingInDto): Promise<SigInResponseDTO> {
    const user = await this.usersService.findOne(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
