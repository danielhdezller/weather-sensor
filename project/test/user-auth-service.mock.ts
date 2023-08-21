import { Injectable } from '@nestjs/common';
import { SingInDto } from 'src/auth/dto/sing-in.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { Users } from 'src/users/services/users.service';

@Injectable()
export class UserAuthServiceMock {
  constructor(private readonly authService: AuthService) {}

  async getAuthenticateUserToken() {
    const singInDto = new SingInDto();
    singInDto.email = Users[0].email;
    singInDto.password = Users[0].password;
    const { access_token } = await this.authService.signIn(singInDto);
    return access_token;
  }
}
