import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  password: string;
}
export const Users: User[] = [
  {
    id: 1,
    email: 'admin@admin.com',
    password: 'pass',
  },
];

@Injectable()
export class UsersService {
  /**
   * This user is temporal to simplify the project to let everybody
   * easily try the authenticated endpoints without signup.
   *
   * @private
   * @memberof UsersService
   */

  findOne(email: string): User | undefined {
    return Users.find((user) => user.email === email);
  }

  getUserById(id: number): User {
    const user = Users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
