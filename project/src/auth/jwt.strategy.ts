import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from 'src/users/services/users.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validates if the jwt is valid.
   *
   * @param {JwtPayload} payload The jwt token payload.
   * @return {*}
   * @memberof JwtStrategy
   */
  async validate(payload: JwtPayload): Promise<User> {
    const userId = payload.userId;

    if (!userId) {
      throw new UnauthorizedException('The jwt token is not valid.');
    }

    return this.userService.getUserById(userId);
  }
}
