import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/services/users.service';
import { SingInDto } from '../dto/sing-in.dto';
import { SigInResponseDTO } from '../dto/sing-in-response.dto';
import { JwtPayload } from '../auth.interface';
import { castAndValidate } from 'src/shared/transform-to-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * In a project with a singUp user, this method will verify from a hashed password that came from DB.
   *
   * @param {string} password
   * @param {User} user
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  checkPassword(password: string, user: User): boolean {
    return user.password === password;
  }

  /**
   * Sing in a user in the application.
   *
   * @param {SingInDto} signInCredentials
   * @return {*}  {Promise<SigInResponseDTO>}
   * @memberof AuthService
   */
  signIn(signInCredentials: SingInDto): Promise<SigInResponseDTO> {
    const { email, password } = signInCredentials;
    const user: User = this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException(
        `The user: ${email} credentials are not valid.`,
      );
    }

    const isValidPassword = this.checkPassword(password, user);
    if (!isValidPassword) {
      throw new UnauthorizedException(
        `The user: ${email} credentials are not valid.`,
      );
    }

    const jwtUserToken: JwtPayload = {
      userId: user.id,
    };

    return castAndValidate(SigInResponseDTO, {
      access_token: this.jwtService.sign(jwtUserToken),
    });
  }
}
